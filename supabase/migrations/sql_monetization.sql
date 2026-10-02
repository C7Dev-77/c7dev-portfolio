-- SQL-MONETIZATION.sql
-- Ejecuta este script en el SQL Editor de Supabase

-- 1. Tabla de productos (para la lógica interna del sistema)
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  price_cents int not null default 0,
  storage_path text not null,
  external_product_id text,
  created_at timestamptz default now()
);

-- 2. Tabla de compras (Lemon Squeezy)
create table if not exists purchases (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id),
  buyer_email text,
  provider text not null default 'lemonsqueezy',
  provider_order_id text unique,
  status text not null default 'pending',
  created_at timestamptz default now()
);

-- 3. Tabla de descargas gratuitas (Work.ink)
create table if not exists free_claims (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id),
  ad_verified boolean not null default false,
  download_token text unique not null,
  expires_at timestamptz not null,
  ip_hash text,
  created_at timestamptz default now()
);

-- Habilitar Row Level Security (RLS) en todas las tablas
alter table products enable row level security;
alter table purchases enable row level security;
alter table free_claims enable row level security;

-- Policies: BLOQUEAR acceso público (anon key) por completo
-- Todo el acceso debe ser mediante server_role (API routes)

-- Drop existing policies if they exist (para evitar errores si lo ejecutas varias veces)
drop policy if exists "Deny all public access to products" on products;
drop policy if exists "Deny all public access to purchases" on purchases;
drop policy if exists "Deny all public access to free_claims" on free_claims;

drop policy if exists "Allow all for service_role on products" on products;
drop policy if exists "Allow all for service_role on purchases" on purchases;
drop policy if exists "Allow all for service_role on free_claims" on free_claims;

-- Crear políticas que siempre evalúan a false para el rol anon
create policy "Deny all public access to products"
  on products for all
  to anon
  using (false);

create policy "Deny all public access to purchases"
  on purchases for all
  to anon
  using (false);

create policy "Deny all public access to free_claims"
  on free_claims for all
  to anon
  using (false);

-- (Opcional, pero recomendado) Permitir el acceso total al rol service_role
create policy "Allow all for service_role on products"
  on products for all
  to service_role
  using (true)
  with check (true);

create policy "Allow all for service_role on purchases"
  on purchases for all
  to service_role
  using (true)
  with check (true);

create policy "Allow all for service_role on free_claims"
  on free_claims for all
  to service_role
  using (true)
  with check (true);
