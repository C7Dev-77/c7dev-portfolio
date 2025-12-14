'use client';

import { useEffect, useState } from 'react';

export default function CustomCursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);

    useEffect(() => {
        const updatePosition = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

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
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', updatePosition);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    return (
        <>
            <style jsx global>{`
        * {
          cursor: none !important;
        }
      `}</style>
            <div
                className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
                }}
            >
                <div
                    className={`
            relative -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white transition-all duration-150 ease-out
            ${isHovering ? 'w-12 h-12 opacity-80' : 'w-6 h-6 opacity-100'}
            ${isClicking ? 'scale-75' : 'scale-100'}
          `}
                >
                    <div className={`
            absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full transition-all duration-150
            ${isHovering ? 'w-2 h-2' : 'w-1 h-1'}
          `} />
                </div>
            </div>
        </>
    );
}
