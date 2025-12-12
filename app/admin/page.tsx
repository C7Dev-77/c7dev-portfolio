'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import {
  ShoppingBag,
  FolderGit2,
  TrendingUp,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  Package,
  Activity,
  Clock,
  Plus,
  ChevronRight,
  Zap,
  Target,
  BarChart3
} from 'lucide-react';

interface Stats {
  totalProductos: number;
  totalProyectos: number;
  productosRecientes: any[];
  proyectosRecientes: any[];
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalProductos: 0,
    totalProyectos: 0,
    productosRecientes: [],
    proyectosRecientes: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Obtener productos
      const { data: productos, count: productosCount } = await supabase
        .from('productos')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .limit(5);

      // Obtener proyectos
      const { data: proyectos, count: proyectosCount } = await supabase
        .from('proyectos')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .limit(5);

      setStats({
        totalProductos: productosCount || productos?.length || 0,
        totalProyectos: proyectosCount || proyectos?.length || 0,
        productosRecientes: productos || [],
        proyectosRecientes: proyectos || []
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Productos',
      value: stats.totalProductos,
      icon: ShoppingBag,
      change: '+12%',
      changeType: 'positive',
      color: 'gold',
      href: '/admin/products'
    },
    {
      title: 'Total Proyectos',
      value: stats.totalProyectos,
      icon: FolderGit2,
      change: '+8%',
      changeType: 'positive',
      color: 'platinum',
      href: '/admin/portfolio'
    },
    {
      title: 'Visitas Mes',
      value: '2.4K',
      icon: Eye,
      change: '+23%',
      changeType: 'positive',
      color: 'green',
      href: '#'
    },
    {
      title: 'Conversión',
      value: '4.2%',
      icon: Target,
      change: '-2%',
      changeType: 'negative',
      color: 'blue',
      href: '#'
    }
  ];

  const quickActions = [
    { label: 'Nuevo Producto', href: '/admin/products', icon: ShoppingBag, color: 'gold' },
    { label: 'Nuevo Proyecto', href: '/admin/portfolio', icon: FolderGit2, color: 'platinum' },
    { label: 'Subir Archivo', href: '/admin/files', icon: Package, color: 'blue' },
  ];

  // Simular datos del gráfico
  const chartData = [40, 65, 45, 80, 55, 70, 85, 60, 75, 90, 70, 95];
  const maxValue = Math.max(...chartData);

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Bienvenido de vuelta 👋
          </h1>
          <p className="text-gray-500">
            Aquí está el resumen de tu panel de control
          </p>
        </div>
        <div className="flex gap-3">
          {quickActions.map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className={`
                flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all
                ${action.color === 'gold'
                  ? 'bg-gradient-to-r from-neon-gold to-amber-600 text-black hover:shadow-lg hover:shadow-neon-gold/25'
                  : action.color === 'platinum'
                    ? 'bg-white/10 text-white border border-gray-700 hover:border-neon-platinum hover:text-neon-platinum'
                    : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                }
              `}
            >
              <action.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{action.label}</span>
              <Plus className="w-4 h-4 sm:hidden" />
            </Link>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <Link
            key={stat.title}
            href={stat.href}
            className="group relative bg-[#111111] rounded-2xl p-6 border border-gray-800/50 hover:border-gray-700 transition-all duration-300 overflow-hidden"
          >
            {/* Background glow effect */}
            <div className={`
              absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
              ${stat.color === 'gold' ? 'bg-gradient-to-br from-neon-gold/10 to-transparent' : ''}
              ${stat.color === 'platinum' ? 'bg-gradient-to-br from-neon-platinum/10 to-transparent' : ''}
              ${stat.color === 'green' ? 'bg-gradient-to-br from-green-500/10 to-transparent' : ''}
              ${stat.color === 'blue' ? 'bg-gradient-to-br from-blue-500/10 to-transparent' : ''}
            `} />

            <div className="relative">
              <div className="flex items-start justify-between mb-4">
                <div className={`
                  p-3 rounded-xl
                  ${stat.color === 'gold' ? 'bg-neon-gold/10 text-neon-gold' : ''}
                  ${stat.color === 'platinum' ? 'bg-neon-platinum/10 text-neon-platinum' : ''}
                  ${stat.color === 'green' ? 'bg-green-500/10 text-green-500' : ''}
                  ${stat.color === 'blue' ? 'bg-blue-500/10 text-blue-500' : ''}
                `}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <div className={`
                  flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full
                  ${stat.changeType === 'positive' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}
                `}>
                  {stat.changeType === 'positive' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {stat.change}
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-3xl font-bold text-white">
                  {loading ? (
                    <span className="inline-block w-16 h-8 bg-gray-800 rounded animate-pulse"></span>
                  ) : (
                    stat.value
                  )}
                </p>
                <p className="text-sm text-gray-500">{stat.title}</p>
              </div>
            </div>

            {/* Hover arrow */}
            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all">
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </div>
          </Link>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Section */}
        <div className="lg:col-span-2 bg-[#111111] rounded-2xl p-6 border border-gray-800/50">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-neon-gold" />
                Actividad del Sitio
              </h3>
              <p className="text-sm text-gray-500">Últimos 12 meses</p>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 text-xs bg-white/5 text-gray-400 rounded-lg hover:bg-white/10 transition-colors">
                Visitas
              </button>
              <button className="px-3 py-1.5 text-xs bg-neon-gold/20 text-neon-gold rounded-lg">
                Interacciones
              </button>
            </div>
          </div>

          {/* Simple Bar Chart */}
          <div className="h-48 flex items-end justify-between gap-2">
            {chartData.map((value, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full bg-gradient-to-t from-neon-gold/80 to-neon-gold/40 rounded-t-lg transition-all duration-500 hover:from-neon-gold hover:to-neon-gold/60"
                  style={{ height: `${(value / maxValue) * 100}%` }}
                />
                <span className="text-[10px] text-gray-600">
                  {['E', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][index]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-[#111111] rounded-2xl p-6 border border-gray-800/50">
          <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <Zap className="w-5 h-5 text-neon-platinum" />
            Estado del Sistema
          </h3>

          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-green-500/10 to-transparent rounded-xl border border-green-500/20">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <div>
                  <p className="text-sm font-medium text-white">Servidor Activo</p>
                  <p className="text-xs text-gray-500">Uptime: 99.9%</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-white/5 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">Base de Datos</span>
                <span className="text-sm text-neon-gold">Supabase</span>
              </div>
              <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-neon-gold to-amber-500 rounded-full" style={{ width: '35%' }} />
              </div>
              <p className="text-[10px] text-gray-600 mt-1">35% almacenamiento usado</p>
            </div>

            <div className="p-4 bg-white/5 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">API Calls</span>
                <span className="text-sm text-green-500">Normal</span>
              </div>
              <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" style={{ width: '12%' }} />
              </div>
              <p className="text-[10px] text-gray-600 mt-1">1.2K / 10K requests</p>
            </div>

            <div className="p-4 bg-white/5 rounded-xl">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Versión</p>
              <p className="text-2xl font-bold text-white">v3.0</p>
              <p className="text-xs text-neon-gold mt-1">Pro Edition</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Items */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Products */}
        <div className="bg-[#111111] rounded-2xl border border-gray-800/50 overflow-hidden">
          <div className="p-6 border-b border-gray-800/50 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-neon-gold" />
              Productos Recientes
            </h3>
            <Link href="/admin/products" className="text-sm text-neon-gold hover:underline flex items-center gap-1">
              Ver todos <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="divide-y divide-gray-800/50">
            {loading ? (
              [...Array(3)].map((_, i) => (
                <div key={i} className="p-4 flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-800 rounded-xl animate-pulse" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-32 bg-gray-800 rounded animate-pulse" />
                    <div className="h-3 w-20 bg-gray-800 rounded animate-pulse" />
                  </div>
                </div>
              ))
            ) : stats.productosRecientes.length > 0 ? (
              stats.productosRecientes.slice(0, 4).map((producto) => (
                <div key={producto.id} className="p-4 flex items-center gap-4 hover:bg-white/5 transition-colors">
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-800">
                    {producto.imagen_url && (
                      <img src={producto.imagen_url} alt={producto.nombre} className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{producto.nombre}</p>
                    <p className="text-xs text-gray-500">${producto.precio}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-600 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(producto.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center">
                <ShoppingBag className="w-10 h-10 text-gray-700 mx-auto mb-2" />
                <p className="text-gray-500 text-sm">No hay productos</p>
                <Link href="/admin/products" className="text-neon-gold text-sm hover:underline">Agregar producto</Link>
              </div>
            )}
          </div>
        </div>

        {/* Recent Projects */}
        <div className="bg-[#111111] rounded-2xl border border-gray-800/50 overflow-hidden">
          <div className="p-6 border-b border-gray-800/50 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <FolderGit2 className="w-5 h-5 text-neon-platinum" />
              Proyectos Recientes
            </h3>
            <Link href="/admin/portfolio" className="text-sm text-neon-platinum hover:underline flex items-center gap-1">
              Ver todos <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="divide-y divide-gray-800/50">
            {loading ? (
              [...Array(3)].map((_, i) => (
                <div key={i} className="p-4 flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-800 rounded-xl animate-pulse" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-32 bg-gray-800 rounded animate-pulse" />
                    <div className="h-3 w-20 bg-gray-800 rounded animate-pulse" />
                  </div>
                </div>
              ))
            ) : stats.proyectosRecientes.length > 0 ? (
              stats.proyectosRecientes.slice(0, 4).map((proyecto) => (
                <div key={proyecto.id} className="p-4 flex items-center gap-4 hover:bg-white/5 transition-colors">
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-800">
                    {proyecto.imagen_url && (
                      <img src={proyecto.imagen_url} alt={proyecto.titulo} className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{proyecto.titulo}</p>
                    <div className="flex gap-1 mt-1">
                      {proyecto.tags?.slice(0, 2).map((tag: string) => (
                        <span key={tag} className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-gray-400">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-600 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(proyecto.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center">
                <FolderGit2 className="w-10 h-10 text-gray-700 mx-auto mb-2" />
                <p className="text-gray-500 text-sm">No hay proyectos</p>
                <Link href="/admin/portfolio" className="text-neon-platinum text-sm hover:underline">Agregar proyecto</Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Activity Log */}
      <div className="bg-[#111111] rounded-2xl border border-gray-800/50 overflow-hidden">
        <div className="p-6 border-b border-gray-800/50">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-green-500" />
            Actividad Reciente
          </h3>
        </div>
        <div className="p-6">
          <div className="relative pl-6 space-y-6">
            {/* Timeline line */}
            <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-neon-gold via-neon-platinum to-gray-800" />

            {[
              { action: 'Sistema iniciado', time: 'Ahora', type: 'system' },
              { action: 'Sesión de administrador activa', time: 'Hace 1 min', type: 'auth' },
              { action: 'Panel de control cargado', time: 'Hace 2 min', type: 'info' },
            ].map((item, index) => (
              <div key={index} className="relative flex items-center gap-4">
                <div className={`
                  absolute left-[-18px] w-4 h-4 rounded-full border-2 bg-[#111111]
                  ${item.type === 'system' ? 'border-neon-gold' : ''}
                  ${item.type === 'auth' ? 'border-green-500' : ''}
                  ${item.type === 'info' ? 'border-gray-600' : ''}
                `}>
                  <div className={`
                    absolute inset-1 rounded-full
                    ${item.type === 'system' ? 'bg-neon-gold' : ''}
                    ${item.type === 'auth' ? 'bg-green-500' : ''}
                    ${item.type === 'info' ? 'bg-gray-600' : ''}
                  `} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-white">{item.action}</p>
                </div>
                <span className="text-xs text-gray-600">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}