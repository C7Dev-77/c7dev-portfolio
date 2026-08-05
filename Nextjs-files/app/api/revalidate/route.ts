// app/api/revalidate/route.ts
// API Route para invalidar el caché de Next.js cuando se hacen cambios desde el admin
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { paths } = body;

        if (!paths || !Array.isArray(paths)) {
            return NextResponse.json({ error: 'paths array required' }, { status: 400 });
        }

        // Revalida todas las rutas solicitadas
        for (const path of paths) {
            revalidatePath(path);
        }

        return NextResponse.json({
            success: true,
            revalidated: paths,
            timestamp: new Date().toISOString()
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
