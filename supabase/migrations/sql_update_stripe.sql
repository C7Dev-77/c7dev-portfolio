-- 1. Añadimos campo stripe_price_id a productos
ALTER TABLE public.productos
ADD COLUMN IF NOT EXISTS stripe_price_id text;

-- 2. Creamos la tabla de compras/orders
CREATE TABLE IF NOT EXISTS public.compras (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    producto_id uuid REFERENCES public.productos(id) ON DELETE SET NULL,
    stripe_session_id text UNIQUE NOT NULL,
    email_cliente text NOT NULL,
    estado_pago text NOT NULL DEFAULT 'pending', -- 'pending', 'paid', 'failed'
    monto numeric NOT NULL,
    moneda text NOT NULL DEFAULT 'usd'
);

-- Habilitar RLS en compras
ALTER TABLE public.compras ENABLE ROW LEVEL SECURITY;

-- Políticas de seguridad para compras
-- Solo administradores pueden ver todas las compras
CREATE POLICY "Permitir select a administradores" ON public.compras
FOR SELECT TO authenticated
USING (true); -- Ajusta esto según tu lógica de admin
