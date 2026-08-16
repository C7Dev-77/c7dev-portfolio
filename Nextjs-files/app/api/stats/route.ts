import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const supabase = createServerSupabaseClient();

    // 1. Contar proyectos del portafolio
    const { count: proyectosCount } = await supabase
      .from('proyectos')
      .select('*', { count: 'exact', head: true });

    // 2. Contar productos de la tienda
    const { count: productosCount } = await (supabase.from('products_public' as any) as any)
      .select('*', { count: 'exact', head: true });

    const projectCount = (proyectosCount || 0) + (productosCount || 0);

    // 3. Obtener métricas acumuladas desde project_metrics
    const { data: metricsData, error: metricsError } = await supabase
      .from('project_metrics' as any)
      .select('project_id, views, downloads');

    if (metricsError) {
      console.error('Error fetching project_metrics:', metricsError.message);
    }

    const projectStats: Record<string, { views: number; downloads: number }> = {};
    let extraViews = 0;
    let extraDownloads = 0;

    if (metricsData && Array.isArray(metricsData)) {
      metricsData.forEach((row: any) => {
        const v = Number(row.views) || 0;
        const d = Number(row.downloads) || 0;
        projectStats[row.project_id] = { views: v, downloads: d };
        extraViews += v;
        extraDownloads += d;
      });
    }

    // 4. Totales reales desde 0 basados en la base de datos
    const totalViews = extraViews;
    const totalDownloads = extraDownloads;

    return NextResponse.json({
      projectCount,
      totalViews,
      totalDownloads,
      projectStats,
    });
  } catch (err: any) {
    console.error('GET /api/stats error:', err);
    return NextResponse.json(
      { error: err.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { projectId, action } = body;

    if (!projectId || !['view', 'download'].includes(action)) {
      return NextResponse.json({ error: 'Invalid parameters' }, { status: 400 });
    }

    const supabase = createServerSupabaseClient();

    // 1. Leer el registro actual de este proyecto (si existe)
    const { data: existing } = await (supabase.from('project_metrics' as any) as any)
      .select('project_id, views, downloads')
      .eq('project_id', projectId)
      .single();

    const currentViews = Number(existing?.views) || 0;
    const currentDownloads = Number(existing?.downloads) || 0;

    const newViews = action === 'view' ? currentViews + 1 : currentViews;
    const newDownloads = action === 'download' ? currentDownloads + 1 : currentDownloads;

    // 2. Upsert atómico usando project_id como clave
    const { error: upsertError } = await (supabase.from('project_metrics' as any) as any)
      .upsert(
        {
          project_id: projectId,
          views: newViews,
          downloads: newDownloads,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'project_id' }
      );

    if (upsertError) {
      console.error('Error upserting project_metrics:', upsertError.message);
      return NextResponse.json(
        { error: 'Failed to update metrics: ' + upsertError.message },
        { status: 500 }
      );
    }

    // 3. Calcular totales actualizados
    const { count: proyectosCount } = await supabase
      .from('proyectos')
      .select('*', { count: 'exact', head: true });

    const { count: productosCount } = await (supabase.from('products_public' as any) as any)
      .select('*', { count: 'exact', head: true });

    const projectCount = (proyectosCount || 0) + (productosCount || 0);

    // Sumar todas las métricas actuales
    const { data: allMetrics } = await (supabase.from('project_metrics' as any) as any)
      .select('views, downloads');

    let extraViews = 0;
    let extraDownloads = 0;

    if (allMetrics && Array.isArray(allMetrics)) {
      allMetrics.forEach((row: any) => {
        extraViews += Number(row.views) || 0;
        extraDownloads += Number(row.downloads) || 0;
      });
    }

    return NextResponse.json({
      success: true,
      projectCount,
      totalViews: extraViews,
      totalDownloads: extraDownloads,
      projectMetric: { views: newViews, downloads: newDownloads },
    });
  } catch (err: any) {
    console.error('POST /api/stats error:', err);
    return NextResponse.json(
      { error: err.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
