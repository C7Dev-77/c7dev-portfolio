'use client';

import { useConfig } from '@/context/ConfigContext';
import { Briefcase, Code, Cpu, Sparkles } from 'lucide-react';

export default function ServicesSection() {
    const { config } = useConfig();
    const services = config?.services || {};

    const defaultServices = [
        {
            title: services?.service1?.title || 'Desarrollo 3D',
            desc: services?.service1?.desc || 'Creación de experiencias visuales inmersivas con tecnologías modernas de renderizado 3D y animaciones interactivas para la web.',
            icon: Sparkles,
            color: 'hover:border-purple-500 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]',
            iconBg: 'bg-purple-500/10 group-hover:bg-purple-500/20',
            iconColor: 'text-purple-400'
        },
        {
            title: services?.service2?.title || 'Arquitectura de Sistemas',
            desc: services?.service2?.desc || 'Diseño escalable y eficiente de infraestructuras complejas, garantizando rendimiento, mantenibilidad y evolución del software.',
            icon: Cpu,
            color: 'hover:border-red-500 hover:shadow-[0_0_30px_rgba(239,68,68,0.15)]',
            iconBg: 'bg-red-500/10 group-hover:bg-red-500/20',
            iconColor: 'text-red-400'
        },
        {
            title: services?.service3?.title || 'Optimización de Código',
            desc: services?.service3?.desc || 'Mejora de rendimiento y calidad en aplicaciones existentes, reduciendo tiempos de carga y deuda técnica con buenas prácticas.',
            icon: Code,
            color: 'hover:border-gray-400 hover:shadow-[0_0_30px_rgba(156,163,175,0.15)]',
            iconBg: 'bg-gray-500/10 group-hover:bg-gray-500/20',
            iconColor: 'text-gray-400'
        },
        {
            title: services?.service4?.title || 'Consultoría Tecnológica',
            desc: services?.service4?.desc || 'Asesoría experta en transformación digital y modernización de procesos para empresas que buscan evolucionar con tecnología.',
            icon: Briefcase,
            color: 'hover:border-amber-600 hover:shadow-[0_0_30px_rgba(217,119,6,0.15)]',
            iconBg: 'bg-amber-600/10 group-hover:bg-amber-600/20',
            iconColor: 'text-amber-500'
        }
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {defaultServices.map((service, idx) => {
                const IconComponent = service.icon;
                return (
                    <div
                        key={idx}
                        className={`group bg-[#0d0d0d] border border-gray-800 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 ${service.color}`}
                    >
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors group-hover:scale-110 duration-300 ${service.iconBg}`}>
                            <IconComponent className={`w-7 h-7 ${service.iconColor}`} />
                        </div>
                        <h3 className={`text-white text-lg font-bold mb-3 group-hover:${service.iconColor} transition-colors`}>
                            {service.title}
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            {service.desc}
                        </p>
                    </div>
                );
            })}
        </div>
    );
}
