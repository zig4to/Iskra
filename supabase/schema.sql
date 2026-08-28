-- Shema za sinhronizacijo Iskre.
-- Prilepi v Supabase → SQL Editor → New query → Run.
-- Skripta je varna za večkratni zagon.
--
-- Brez prijave: Iskra je samo za enega uporabnika (Žigo), zato ni auth.uid()
-- razmejevanja kot pri Racuniju/Bonih — cela tabela je ena sama vrstica z
-- vsemi zavihki/kategorijami/beležkami kot en jsonb blob. Dostop je odprt
-- prek javnega anon ključa; ker ni osebnih/plačilnih podatkov, to ni tveganje,
-- le nekdo, ki bi poznal URL projekta, bi lahko prebral/prepisal seznam idej.

create table if not exists public.iskra_data (
  id         int         primary key default 1,
  data       jsonb       not null default '{}'::jsonb,   -- cela `data` struktura iz script.js
  updated_at timestamptz not null default now(),
  constraint iskra_data_singleton check (id = 1)          -- ena sama vrstica, vedno id=1
);

-- Samodejno posodobi updated_at ob vsakem update-u, da klientu ni treba
-- pošiljati svoje ure — primerjamo strežniški čas.
create or replace function public.iskra_data_touch() returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists iskra_data_touch on public.iskra_data;
create trigger iskra_data_touch before update on public.iskra_data
  for each row execute function public.iskra_data_touch();

-- Seed edine vrstice, če je še ni.
insert into public.iskra_data (id, data) values (1, '{}'::jsonb)
on conflict (id) do nothing;

alter table public.iskra_data enable row level security;

-- "Automatically expose new tables" je v tem projektu izklopljeno, zato je
-- treba osnovno pravico podeliti izrecno (ločeno od RLS pravil spodaj).
-- Brez INSERT/DELETE — edina vrstica je že vsajena zgoraj, klient jo samo
-- bere in posodablja.
grant select, update on table public.iskra_data to anon;

drop policy if exists "iskra_data_select" on public.iskra_data;
create policy "iskra_data_select" on public.iskra_data
  for select using (true);

drop policy if exists "iskra_data_update" on public.iskra_data;
create policy "iskra_data_update" on public.iskra_data
  for update using (true) with check (true);
