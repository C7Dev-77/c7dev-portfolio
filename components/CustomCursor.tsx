'use client';

import { useEffect, useState } from 'react';

export default function CustomCursor() {
    const [position, setPosition] = useState({ x: -100, y: -100 });
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isTouchDevice, setIsTouchDevice] = useState(true);

    useEffect(() => {
        // Detectar si es dispositivo táctil (móvil/tablet)
        const checkTouch = () => {
            setIsTouchDevice(
                window.matchMedia('(hover: none) and (pointer: coarse)').matches ||
                'ontouchstart' in window
            );
        };
        checkTouch();
        window.addEventListener('resize', checkTouch);
        return () => window.removeEventListener('resize', checkTouch);
    }, []);

    useEffect(() => {
        if (isTouchDevice) return;

        const updatePosition = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button') ||
                target.classList.contains('cursor-pointer')
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', updatePosition);
        window.addEventListener('mouseover', handleMouseOver);
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseenter', handleMouseEnter);

        return () => {
            window.removeEventListener('mousemove', updatePosition);
            window.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, [isTouchDevice, isVisible]);

    // No renderizar en dispositivos táctiles
    if (isTouchDevice) return null;

    return (
        <>
            <style jsx global>{`
              @media (hover: hover) and (pointer: fine) {
                * { cursor: none !important; }
              }
            `}</style>
            <div
                className="fixed top-0 left-0 pointer-events-none z-[9999]"
                style={{
                    transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
                    opacity: isVisible ? 1 : 0,
                    transition: 'opacity 0.2s ease',
                }}
            >
                {/* Punto central simple */}
                <div
                    className={`
                        relative -translate-x-1/2 -translate-y-1/2 rounded-full bg-white
                        transition-all duration-150 ease-out
                        ${isHovering ? 'w-3 h-3 opacity-80 shadow-[0_0_8px_rgba(255,215,0,0.8)] bg-neon-gold' : 'w-2.5 h-2.5 opacity-90'}
                    `}
                />
            </div>
        </>
    );
}
