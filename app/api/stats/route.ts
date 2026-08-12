import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

interface ProjectMetricItem {
  views: number;
  downloads: number;
}

export async function GET() {
  try {
    const supabase = createServerSupabaseClient();

    // 1. Obtener conteo real de proyectos del portafolio y tienda
    const { count: proyectosCount } = await supabase
      .from('proyectos')
      .select('*', { count: 'exact', head: true });

    const { count: productosCount } = await (supabase.from('products_public' as any) as any)
      .select('*', { count: 'exact', head: true });

    const projectCount = (proyectosCount || 0) + (productosCount || 0);

    // 2. Obtener métricas adicionales por proyecto desde Supabase
    let projectStats: Record<string, ProjectMetricItem> = {};

    // Primero intentamos consultar la tabla 'project_metrics'
    const { data: metricsData, error: metricsError } = await supabase
      .from('project_metrics' as any)
      .select('project_id, views, downloads');

    if (!metricsError && metricsData) {
      metricsData.forEach((row: any) => {
        projectStats[row.project_id] = {
          views: Number(row.views) || 0,
          downloads: Number(row.downloads) || 0,
        };
      });
    } else {
      // Fallback a site_settings si project_metrics no existe en Supabase aún
      const { data: settingsData } = await supabase
        .from('site_settings')
        .select('config')
        .eq('id', 2)
        .single();

      if (settingsData?.config?.projectStats) {
        projectStats = settingsData.config.projectStats;
      }
    }

    // 3. Calcular totales globales acumulados
    // Regla: Cada proyecto inicia en 100 vistas y 100 descargas
    const baseViews = projectCount * 100;
    const baseDownloads = projectCount * 100;

    let extraViews = 0;
    let extraDownloads = 0;

    Object.values(projectStats).forEach((item) => {
      extraViews += item.views || 0;
      extraDownloads += item.downloads || 0;
    });

    const totalViews = baseViews + extraViews;
    const totalDownloads = baseDownloads + extraDownloads;

    return NextResponse.json({
      projectCount,
      totalViews,
      totalDownloads,
      projectStats,
    });
  } catch (err: any) {
    console.error('GET /api/stats error:', err);
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
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

    // 1. Obtener estado actual desde Supabase (intentando project_metrics o site_settings)
    let currentStats: Record<string, ProjectMetricItem> = {};
    let usingProjectMetricsTable = false;

    const { data: metricsData, error: metricsError } = await supabase
      .from('project_metrics' as any)
      .select('project_id, views, downloads');

    if (!metricsError && metricsData) {
      usingProjectMetricsTable = true;
      metricsData.forEach((row: any) => {
        currentStats[row.project_id] = {
          views: Number(row.views) || 0,
          downloads: Number(row.downloads) || 0,
        };
      });
    } else {
      const { data: settingsData } = await supabase
        .from('site_settings')
        .select('config')
        .eq('id', 2)
        .single();

      if (settingsData?.config?.projectStats) {
        currentStats = settingsData.config.projectStats;
      }
    }

    // 2. Incrementar contador para este proyecto
    const currentProjectMetric = currentStats[projectId] || { views: 0, downloads: 0 };
    if (action === 'view') {
      currentProjectMetric.views += 1;
    } else if (action === 'download') {
      currentProjectMetric.downloads += 1;
    }
    currentStats[projectId] = currentProjectMetric;

    // 3. Persistir en Supabase
    if (usingProjectMetricsTable) {
      await supabase
        .from('project_metrics' as any)
        .upsert(
          {
            project_id: projectId,
            views: currentProjectMetric.views,
            downloads: currentProjectMetric.downloads,
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'project_id' }
        );
    }

    // Siempre guardamos también en site_settings id=2 para garantizar persistencia absoluta
    await supabase
      .from('site_settings')
      .upsert(
        {
          id: 2,
          config: { projectStats: currentStats },
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'id' }
      );

    // 4. Calcular nuevos totales
    const { count: proyectosCount } = await supabase
      .from('proyectos')
      .select('*', { count: 'exact', head: true });

    const { count: productosCount } = await (supabase.from('products_public' as any) as any)
      .select('*', { count: 'exact', head: true });

    const projectCount = (proyectosCount || 0) + (productosCount || 0);

    let extraViews = 0;
    let extraDownloads = 0;

    Object.values(currentStats).forEach((item) => {
      extraViews += item.views || 0;
      extraDownloads += item.downloads || 0;
    });

    const totalViews = (projectCount * 100) + extraViews;
    const totalDownloads = (projectCount * 100) + extraDownloads;

    return NextResponse.json({
      success: true,
      projectCount,
      totalViews,
      totalDownloads,
      projectMetric: currentProjectMetric,
    });
  } catch (err: any) {
    console.error('POST /api/stats error:', err);
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}
