'use client';

import { useEffect, useRef } from 'react';

export default function ParticleNetwork() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas dimensions
        const resizeCanvas = () => {
            if (canvas) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Particle class
        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            radius: number;
            // Guardamos la referencia al canvas para usarla en update
            private canvasRefs: HTMLCanvasElement;

            constructor(canvasKw: HTMLCanvasElement) {
                this.canvasRefs = canvasKw;
                this.x = Math.random() * this.canvasRefs.width;
                this.y = Math.random() * this.canvasRefs.height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.radius = Math.random() * 2 + 1;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Bounce off edges (usamos la referencia guardada)
                if (this.x < 0 || this.x > this.canvasRefs.width) this.vx *= -1;
                if (this.y < 0 || this.y > this.canvasRefs.height) this.vy *= -1;
            }

            draw(context: CanvasRenderingContext2D) {
                context.beginPath();
                context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                context.fillStyle = 'rgba(255, 215, 0, 0.8)'; // Premium gold
                context.fill();

                // Glow effect
                context.shadowBlur = 15;
                context.shadowColor = '#FFD700';
            }
        }

        // Create particles - pasamos el canvas explícitamente
        const particleCount = 80;
        const particles: Particle[] = [];

        for (let i = 0; i < particleCount; i++) {
            // Aseguramos que pasamos el canvas no nulo
            if (canvas) {
                particles.push(new Particle(canvas));
            }
        }

        // Draw connections between nearby particles
        const drawConnections = () => {
            if (!ctx) return;

            const maxDistance = 150;

            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < maxDistance) {
                        const opacity = 1 - (distance / maxDistance);
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(255, 215, 0, ${opacity * 0.4})`; // More visible gold
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            }
        };

        // Animation loop
        let animationFrameId: number;
        const animate = () => {
            if (!ctx || !canvas) return;

            // Clear canvas with fade effect
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Reset shadow
            ctx.shadowBlur = 0;

            // Draw connections first
            drawConnections();

            // Update and draw particles
            particles.forEach(particle => {
                particle.update();
                particle.draw(ctx);
            });

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
            style={{ opacity: 0.45 }}
        />
    );
}
