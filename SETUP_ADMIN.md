# Configuración del Panel de Administración

¡Tu panel de administración está listo en el código! Para que funcione con la base de datos, necesitas ejecutar estos comandos en tu **Supabase SQL Editor**.

## 1. Crear Tabla de Productos (Si no existe)

```sql
create table public.productos (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  nombre text not null,
  descripcion text,
  precio numeric,
  imagen_url text,
  link_free text,
  link_paid text
);

-- Habilitar seguridad (Row Level Security)
alter table public.productos enable row level security;

-- Política: Cualquiera puede VER productos
create policy "Public Access" on public.productos
  for select using (true);

-- Política: Solo usuarios autenticados pueden CREAR/EDITAR/BORRAR
create policy "Admin Access" on public.productos
  for all using (auth.role() = 'authenticated');
```

## 2. Crear Tabla de Portafolio (Proyectos)

```sql
create table public.proyectos (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  titulo text not null,
  descripcion text,
  imagen_url text,
  repo_url text,
  demo_url text,
  tags text[] -- Array de textos para etiquetas (React, Nextjs, etc)
);

-- Habilitar seguridad
alter table public.proyectos enable row level security;

-- Política: Cualquiera puede VER
create policy "Public Access Projects" on public.proyectos
  for select using (true);

-- Política: Solo Admin puede EDITAR
create policy "Admin Access Projects" on public.proyectos
  for all using (auth.role() = 'authenticated');
```

## 3. Configurar Almacenamiento (Storage)

Necesitas crear un "Bucket" para subir archivos.

1.  Ve a la sección **Storage** en Supabase.
2.  Crea un nuevo bucket llamado `assets`.
3.  Hazlo **Public** (Público).
4.  Guarda los cambios.

### Políticas de Storage (Opcional pero recomendado)
En el editor SQL, ejecuta esto para permitir subidas solo a ti:

```sql
-- Permitir ver archivos a todos
create policy "Public Access Storage" on storage.objects
  for select using ( bucket_id = 'assets' );

-- Permitir subir/borrar solo a autenticados
create policy "Admin Upload Storage" on storage.objects
  for insert with check ( bucket_id = 'assets' and auth.role() = 'authenticated' );

create policy "Admin Delete Storage" on storage.objects
  for delete using ( bucket_id = 'assets' and auth.role() = 'authenticated' );
```

---

## Cómo usar tu Panel

1.  Inicia el servidor: `npm run dev`
2.  Ve a `localhost:3000/register` para crear tu cuenta de administrador.
3.  Entra a `localhost:3000/admin`.
4.  ¡Empieza a gestionar tu imperio digital!
