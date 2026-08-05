'use client';

import { useEffect, useRef } from 'react';

interface CodeSnippet {
    text: string;
    x: number;
    y: number;
    speed: number;
    opacity: number;
    size: number;
}

export default function FloatingCode() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resizeCanvas = () => {
            if (canvas) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Snippets de código y comandos
        const codeTexts = [
            'const dev = () => {}',
            'npm install',
            'git commit -m',
            'function()',
            '<Component />',
            'async/await',
            'import React',
            'export default',
            'useState()',
            'useEffect()',
            'return (',
            'className=',
            'onClick={',
            'map(item =>',
            'filter(x =>',
            '{ ...spread }',
            'Promise.all',
            'fetch(api)',
            'console.log',
            'try { catch',
            'interface {}',
            'type Props =',
            'extends',
            'implements',
            'public static',
            'private void',
            'SELECT * FROM',
            'WHERE id =',
            'JOIN ON',
            'ORDER BY',
            'npm run dev',
            'yarn build',
            'docker run',
            'git push',
            'cd ~/project',
            'mkdir src',
            'touch index',
            'chmod +x',
            'sudo apt',
            'pip install',
        ];

        const snippets: CodeSnippet[] = [];
        const maxSnippets = 25;

        // Colores premium: oro, platino, negro con neón
        const colors = [
            'rgba(255, 215, 0, 0.6)',    // Oro
            'rgba(229, 228, 226, 0.5)',  // Platino
            'rgba(192, 192, 192, 0.4)',  // Plata
            'rgba(255, 223, 0, 0.7)',    // Oro brillante
            'rgba(200, 200, 200, 0.5)',  // Gris metálico
        ];

        // Crear snippets iniciales
        for (let i = 0; i < maxSnippets; i++) {
            snippets.push({
                text: codeTexts[Math.floor(Math.random() * codeTexts.length)],
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                speed: 0.2 + Math.random() * 0.5,
                opacity: 0.2 + Math.random() * 0.4,
                size: 10 + Math.random() * 6,
            });
        }

        let animationFrameId: number;
        const animate = () => {
            if (!ctx || !canvas) return;

            // Fondo más oscuro con fade
            ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            snippets.forEach((snippet, index) => {
                // Mover hacia arriba
                snippet.y -= snippet.speed;

                // Si sale de la pantalla, reiniciar abajo
                if (snippet.y < -50) {
                    snippet.y = canvas.height + 50;
                    snippet.x = Math.random() * canvas.width;
                    snippet.text = codeTexts[Math.floor(Math.random() * codeTexts.length)];
                }

                // Dibujar texto
                ctx.font = `${snippet.size}px 'Courier New', monospace`;
                ctx.fillStyle = colors[index % colors.length].replace(/[\d.]+\)$/, `${snippet.opacity})`);
                ctx.fillText(snippet.text, snippet.x, snippet.y);

                // Efecto glow sutil
                ctx.shadowBlur = 8;
                ctx.shadowColor = colors[index % colors.length];
            });

            // Reset shadow
            ctx.shadowBlur = 0;

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full pointer-events-none z-0"
            style={{ opacity: 0.25 }}
        />
    );
}
