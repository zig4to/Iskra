/* Izriše ikone PNG iz iste risbe kot icon.svg — brez zunanjih odvisnosti.
   Zagon: node tools/make-icons.js */
var zlib = require('zlib'), fs = require('fs'), path = require('path');

var OUT = path.join(__dirname, '..', 'icons');
var SS = 4;                        // nadvzorčenje za mehke robove

var GRAD_A = [0xf5, 0x9e, 0x0b];   // amber
var GRAD_B = [0xef, 0x44, 0x44];   // rdeča
var BOLT = [0xff, 0xff, 0xff];

// Blisk (zap), v koordinatah viewBox 0..24 — isto kot icon.svg.
var BOLT_POLY = [13, 2, 3, 14, 12, 14, 11, 22, 21, 10, 12, 10];
var ART = { cx: 12, cy: 12 };      // sredina risbe = sredina viewBoxa

// --------------------------------------------------------------- geometrija
function insideRoundRect(x, y, w, h, r) {
  if (x < 0 || y < 0 || x > w || y > h) return false;
  var cx = Math.min(Math.max(x, r), w - r);
  var cy = Math.min(Math.max(y, r), h - r);
  var dx = x - cx, dy = y - cy;
  return dx * dx + dy * dy <= r * r;
}

function insidePolygon(x, y, pts) {
  var hit = false;
  for (var i = 0, j = pts.length - 2; i < pts.length; j = i, i += 2) {
    var xi = pts[i], yi = pts[i + 1], xj = pts[j], yj = pts[j + 1];
    if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) hit = !hit;
  }
  return hit;
}

function lerp(a, b, t) { return Math.round(a + (b - a) * t); }

// ------------------------------------------------------------------ risanje
function Bitmap(size) {
  this.size = size;
  this.px = new Uint8Array(size * size * 4);
}

Bitmap.prototype.fill = function (test, color) {
  var n = this.size, p = this.px;
  for (var y = 0; y < n; y++) {
    for (var x = 0; x < n; x++) {
      if (test(x + 0.5, y + 0.5)) {
        var o = (y * n + x) * 4;
        p[o] = color[0]; p[o + 1] = color[1]; p[o + 2] = color[2]; p[o + 3] = 255;
      }
    }
  }
};

/* Diagonalni preliv od GRAD_A (zgoraj levo) do GRAD_B (spodaj desno). */
Bitmap.prototype.fillGradient = function (test, a, b) {
  var n = this.size, p = this.px;
  for (var y = 0; y < n; y++) {
    for (var x = 0; x < n; x++) {
      if (test(x + 0.5, y + 0.5)) {
        var t = (x + y) / (2 * (n - 1));
        var o = (y * n + x) * 4;
        p[o] = lerp(a[0], b[0], t); p[o + 1] = lerp(a[1], b[1], t);
        p[o + 2] = lerp(a[2], b[2], t); p[o + 3] = 255;
      }
    }
  }
};

function downsample(big, size) {
  var out = new Uint8Array(size * size * 4), n = big.size, f = n / size, area = f * f;
  for (var y = 0; y < size; y++) {
    for (var x = 0; x < size; x++) {
      var r = 0, g = 0, b = 0, a = 0;
      for (var sy = 0; sy < f; sy++) {
        for (var sx = 0; sx < f; sx++) {
          var o = ((y * f + sy) * n + (x * f + sx)) * 4;
          if (big.px[o + 3]) { r += big.px[o]; g += big.px[o + 1]; b += big.px[o + 2]; a += 255; }
        }
      }
      var d = (y * size + x) * 4;
      if (a) {
        out[d] = Math.round(r / (a / 255)); out[d + 1] = Math.round(g / (a / 255));
        out[d + 2] = Math.round(b / (a / 255)); out[d + 3] = Math.round(a / area);
      }
    }
  }
  return out;
}

/* maskable = polno ozadje brez zaobljenih vogalov, risba pomanjšana v varno cono. */
function drawIcon(size, maskable) {
  var n = size * SS, bmp = new Bitmap(n), unit = n / 24;
  var scale = maskable ? 0.72 : 1;
  var ox = ART.cx, oy = ART.cy;
  function X(u) { return ((u - ox) * scale + 12) * unit; }
  function Y(v) { return ((v - oy) * scale + 12) * unit; }

  if (maskable) {
    bmp.fillGradient(function () { return true; }, GRAD_A, GRAD_B);
  } else {
    bmp.fillGradient(function (x, y) { return insideRoundRect(x, y, n, n, 7 * unit); }, GRAD_A, GRAD_B);
  }

  var poly = [];
  for (var i = 0; i < BOLT_POLY.length; i += 2) poly.push(X(BOLT_POLY[i]), Y(BOLT_POLY[i + 1]));
  bmp.fill(function (x, y) { return insidePolygon(x, y, poly); }, BOLT);

  return downsample(bmp, size);
}

// ----------------------------------------------------------------- zapis PNG
var CRC = (function () {
  var t = new Int32Array(256);
  for (var i = 0; i < 256; i++) {
    var c = i;
    for (var k = 0; k < 8; k++) c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    t[i] = c;
  }
  return t;
})();

function crc32(buf) {
  var c = -1;
  for (var i = 0; i < buf.length; i++) c = CRC[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ -1) >>> 0;
}

function chunk(type, data) {
  var head = Buffer.alloc(8);
  head.writeUInt32BE(data.length, 0);
  head.write(type, 4, 'ascii');
  var crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([head.slice(4), data])), 0);
  return Buffer.concat([head, data, crc]);
}

function encodePng(size, rgba) {
  var stride = size * 4;
  var raw = Buffer.alloc((stride + 1) * size);
  for (var y = 0; y < size; y++) {
    raw[y * (stride + 1)] = 0;
    Buffer.from(rgba.buffer, y * stride, stride).copy(raw, y * (stride + 1) + 1);
  }
  var ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', zlib.deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0))
  ]);
}

// --------------------------------------------------------------------- zagon
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

[
  { file: 'icon-192.png', size: 192, maskable: false },
  { file: 'icon-512.png', size: 512, maskable: false },
  { file: 'icon-maskable-192.png', size: 192, maskable: true },
  { file: 'icon-maskable-512.png', size: 512, maskable: true },
  { file: 'apple-touch-icon.png', size: 180, maskable: true }
].forEach(function (spec) {
  var buf = encodePng(spec.size, drawIcon(spec.size, spec.maskable));
  fs.writeFileSync(path.join(OUT, spec.file), buf);
  console.log('  icons/' + spec.file + '  (' + spec.size + 'x' + spec.size + ', ' + Math.round(buf.length / 1024) + ' kB)');
});
