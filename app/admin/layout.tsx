'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import {
    LayoutDashboard,
    ShoppingBag,
    FolderGit2,
    Image,
    Settings,
    LogOut,
    ChevronRight,
    Menu,
    X,
    Home,
    Bell,
    Search,
    User
} from 'lucide-react';

const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Productos', href: '/admin/products', icon: ShoppingBag },
    { name: 'Portafolio', href: '/admin/portfolio', icon: FolderGit2 },
    { name: 'Archivos', href: '/admin/files', icon: Image },
    { name: 'Configuración', href: '/admin/settings', icon: Settings, disabled: true },
];

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const [authorized, setAuthorized] = useState(false);
    const [checking, setChecking] = useState(true);
    const [user, setUser] = useState<any>(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    useEffect(() => {
        let mounted = true;
        const validateSession = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();

                if (mounted) {
                    if (!session) {
                        router.push('/login');
                    } else {
                        setUser(session.user);
                        setAuthorized(true);
                    }
                }
            } catch (error) {
                console.error("Auth check failed", error);
            } finally {
                if (mounted) setChecking(false);
            }
        };

        validateSession();
        return () => { mounted = false; };
    }, [router]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/login');
    };

    if (checking) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a]">
                <div className="relative">
                    <div className="w-16 h-16 border-4 border-transparent border-t-neon-gold rounded-full animate-spin"></div>
                    <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-b-neon-platinum rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
                </div>
                <p className="mt-6 text-gray-500 text-sm tracking-widest uppercase animate-pulse">Verificando credenciales...</p>
            </div>
        );
    }

    if (!authorized) {
        return null;
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] flex">
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed lg:sticky top-0 left-0 z-50 h-screen
                ${sidebarCollapsed ? 'w-20' : 'w-72'} 
                bg-[#0d0d0d] border-r border-gray-800/50
                transform transition-all duration-300 ease-in-out
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                flex flex-col
            `}>
                {/* Logo Section */}
                <div className={`h-20 flex items-center ${sidebarCollapsed ? 'justify-center px-2' : 'justify-between px-6'} border-b border-gray-800/50`}>
                    {!sidebarCollapsed && (
                        <Link href="/admin" className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-neon-gold to-amber-600 rounded-xl flex items-center justify-center">
                                <span className="text-black font-black text-lg">C7</span>
                            </div>
                            <div>
                                <span className="text-white font-bold text-lg">C7Dev</span>
                                <span className="block text-[10px] text-gray-500 uppercase tracking-widest">Admin Panel</span>
                            </div>
                        </Link>
                    )}
                    {sidebarCollapsed && (
                        <div className="w-10 h-10 bg-gradient-to-br from-neon-gold to-amber-600 rounded-xl flex items-center justify-center">
                            <span className="text-black font-black text-lg">C7</span>
                        </div>
                    )}
                    <button
                        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                        className="hidden lg:flex p-2 hover:bg-white/5 rounded-lg transition-colors text-gray-400 hover:text-white"
                    >
                        <ChevronRight className={`w-5 h-5 transition-transform ${sidebarCollapsed ? '' : 'rotate-180'}`} />
                    </button>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden p-2 hover:bg-white/5 rounded-lg text-gray-400"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href || (item.href !== '/admin' && pathname?.startsWith(item.href));
                        return (
                            <Link
                                key={item.name}
                                href={item.disabled ? '#' : item.href}
                                className={`
                                    flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                                    ${sidebarCollapsed ? 'justify-center' : ''}
                                    ${item.disabled
                                        ? 'opacity-40 cursor-not-allowed'
                                        : isActive
                                            ? 'bg-gradient-to-r from-neon-gold/20 to-transparent text-neon-gold border-l-2 border-neon-gold'
                                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }
                                `}
                                title={sidebarCollapsed ? item.name : undefined}
                            >
                                <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-neon-gold' : ''}`} />
                                {!sidebarCollapsed && (
                                    <>
                                        <span className="font-medium">{item.name}</span>
                                        {item.disabled && (
                                            <span className="ml-auto text-[9px] bg-gray-800 px-2 py-0.5 rounded-full text-gray-500">Pronto</span>
                                        )}
                                    </>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* User Section */}
                <div className={`p-4 border-t border-gray-800/50 ${sidebarCollapsed ? 'px-2' : ''}`}>
                    {!sidebarCollapsed ? (
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-platinum to-gray-600 flex items-center justify-center">
                                <User className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm text-white font-medium truncate">Administrador</p>
                                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="p-2 hover:bg-red-500/20 rounded-lg transition-colors text-gray-400 hover:text-red-500"
                                title="Cerrar sesión"
                            >
                                <LogOut className="w-4 h-4" />
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={handleLogout}
                            className="w-full p-3 hover:bg-red-500/20 rounded-xl transition-colors text-gray-400 hover:text-red-500 flex justify-center"
                            title="Cerrar sesión"
                        >
                            <LogOut className="w-5 h-5" />
                        </button>
                    )}
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-screen">
                {/* Top Header */}
                <header className="h-20 bg-[#0d0d0d]/80 backdrop-blur-xl border-b border-gray-800/50 sticky top-0 z-30 flex items-center justify-between px-6">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden p-2 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white"
                        >
                            <Menu className="w-6 h-6" />
                        </button>

                        {/* Breadcrumb */}
                        <div className="hidden md:flex items-center gap-2 text-sm">
                            <Link href="/" className="text-gray-500 hover:text-white transition-colors flex items-center gap-1">
                                <Home className="w-4 h-4" />
                            </Link>
                            <ChevronRight className="w-4 h-4 text-gray-700" />
                            <span className="text-gray-400">Admin</span>
                            {pathname !== '/admin' && (
                                <>
                                    <ChevronRight className="w-4 h-4 text-gray-700" />
                                    <span className="text-white capitalize">{pathname?.split('/').pop()}</span>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* Search */}
                        <div className="hidden md:flex items-center gap-2 bg-white/5 rounded-xl px-4 py-2 border border-gray-800/50 focus-within:border-neon-gold/50 transition-colors">
                            <Search className="w-4 h-4 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Buscar..."
                                className="bg-transparent border-none outline-none text-sm text-white placeholder:text-gray-600 w-48"
                            />
                            <kbd className="text-[10px] bg-gray-800 px-2 py-0.5 rounded text-gray-500">⌘K</kbd>
                        </div>

                        {/* Notifications */}
                        <button className="relative p-2 hover:bg-white/5 rounded-xl transition-colors text-gray-400 hover:text-white">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-neon-gold rounded-full"></span>
                        </button>

                        {/* Ver sitio */}
                        <Link
                            href="/"
                            target="_blank"
                            className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-neon-gold/10 to-transparent border border-neon-gold/30 rounded-xl text-neon-gold text-sm font-medium hover:bg-neon-gold/20 transition-all"
                        >
                            <Home className="w-4 h-4" />
                            Ver Sitio
                        </Link>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-6 overflow-y-auto">
                    {children}
                </main>

                {/* Footer */}
                <footer className="h-14 border-t border-gray-800/50 flex items-center justify-between px-6 text-xs text-gray-600">
                    <span>© 2024 C7Dev. Todos los derechos reservados.</span>
                    <span className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        Sistema Operativo
                    </span>
                </footer>
            </div>
        </div>
    );
}
