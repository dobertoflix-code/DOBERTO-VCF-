-- DOBERTO VCF — Schema Supabase
-- Kopye/kole sa nan SQL Editor Supabase w la epi jwe li.

create table if not exists registrations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text,
  dial_code text not null,        -- egzanp: '509'
  country_name text not null,     -- egzanp: 'Haiti'
  phone text not null,            -- sèlman chif, san kòd peyi a (egzanp: '38112345')
  full_number text not null,      -- '509' + '38112345' => '50938112345'
  created_at timestamptz not null default now()
);

-- Anpeche menm nimewo a enskri de fwa
create unique index if not exists registrations_full_number_key
  on registrations (full_number);

-- Recherche rapid pa non pou verifikasyon download
create index if not exists registrations_name_idx
  on registrations (lower(name));

-- Row Level Security: aktive'l, men se sèlman backend (service role key)
-- ki gen aksè — pa gen okenn "public policy" ki bay aksè dirèk.
alter table registrations enable row level security;
