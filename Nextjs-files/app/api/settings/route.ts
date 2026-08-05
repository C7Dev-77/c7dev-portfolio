import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'christian.dev.77@gmail.com';

export async function GET() {
  try {
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from('site_settings')
      .select('config')
      .eq('id', 1)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching site_settings:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ config: data?.config || null });
  } catch (err: any) {
    console.error('GET /api/settings error:', err);
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('Authorization') || '';
    const token = authHeader.replace('Bearer ', '').trim();

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized: Missing token' }, { status: 401 });
    }

    const supabase = createServerSupabaseClient();

    // Validar token directamente con Supabase Auth
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized: Invalid token' },
        { status: 401 }
      );
    }

    // Validar email del usuario contra ADMIN_EMAIL (NUNCA del body de la solicitud)
    if (user.email !== ADMIN_EMAIL) {
      return NextResponse.json(
        { error: 'Forbidden: User is not authorized to edit settings' },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { config } = body;

    if (!config) {
      return NextResponse.json({ error: 'Bad Request: Missing config object' }, { status: 400 });
    }

    // Upsert a la tabla site_settings
    const { error: dbError } = await supabase
      .from('site_settings')
      .upsert(
        {
          id: 1,
          config,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'id' }
      );

    if (dbError) {
      console.error('Error saving site_settings:', dbError);
      return NextResponse.json({ error: dbError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Settings saved successfully' });
  } catch (err: any) {
    console.error('POST /api/settings error:', err);
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}
