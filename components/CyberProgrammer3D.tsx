'use client';

import { useEffect, useRef } from 'react';

export default function CyberProgrammer3D() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas dimensions
        const resizeCanvas = () => {
            // Usamos el signo de exclamación para asegurar a TS que canvas no es null aquí,
            // ya que estamos dentro de una función donde sabemos que existe por el check inicial,
            // pero para callbacks de eventos es más seguro volver a verificar o usar ! con cuidado.
            if (canvas) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // 3D Programmer Character Class
        class Programmer3D {
            x: number;
            y: number;
            scale: number;
            rotation: number;
            floatOffset: number;

            constructor() {
                // Aseguramos valores por defecto si canvas fuera null (aunque no lo será por el check previo)
                const width = canvas ? canvas.width : window.innerWidth;
                const height = canvas ? canvas.height : window.innerHeight;

                // Position on the right side of the screen
                this.x = width - (width < 768 ? width / 2 : width / 4); // Ajuste responsivo
                this.y = height / 2 + 50;
                this.scale = width < 768 ? 0.8 : 1.2;
                this.rotation = 0;
                this.floatOffset = 0;
            }

            update(time: number) {
                if (!canvas) return;

                // Update position on resize logic
                const width = canvas.width;
                this.x = width - (width < 768 ? width / 2 : width / 4);

                this.floatOffset = Math.sin(time * 0.002) * 15;
                this.rotation = Math.sin(time * 0.001) * 0.05;
            }

            draw() {
                if (!ctx) return;

                ctx.save();
                ctx.translate(this.x, this.y + this.floatOffset);
                ctx.scale(this.scale, this.scale);
                ctx.rotate(this.rotation);

                // --- CUERPO ---
                // Torso (Cyber armor style)
                ctx.fillStyle = '#001a2c'; // Dark blue cyber
                ctx.strokeStyle = '#00d9ff'; // Cyan neon
                ctx.lineWidth = 2;

                ctx.beginPath();
                ctx.moveTo(-40, -60);
                ctx.lineTo(40, -60);
                ctx.lineTo(30, 60);
                ctx.lineTo(-30, 60);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();

                // Cyber details on torso
                ctx.beginPath();
                ctx.moveTo(-20, -40);
                ctx.lineTo(20, -40);
                ctx.moveTo(0, -40);
                ctx.lineTo(0, 40);
                ctx.strokeStyle = 'rgba(0, 217, 255, 0.3)';
                ctx.stroke();

                // Glow core (Iron man style but cyber)
                ctx.beginPath();
                ctx.arc(0, -10, 8, 0, Math.PI * 2);
                ctx.fillStyle = '#00ff88';
                ctx.fill();
                ctx.shadowColor = '#00ff88';
                ctx.shadowBlur = 15;
                ctx.stroke();
                ctx.shadowBlur = 0; // Reset shadow

                // --- CABEZA ---
                // Cabeza (Hoodie style abstract)
                ctx.fillStyle = '#000f1a';
                ctx.strokeStyle = '#00d9ff';

                ctx.beginPath();
                ctx.arc(0, -90, 35, Math.PI, 0); // Top of head
                ctx.lineTo(35, -70);
                ctx.lineTo(0, -50); // Chin
                ctx.lineTo(-35, -70);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();

                // Lentes Visor (Cyber glasses)
                ctx.beginPath();
                ctx.moveTo(-20, -95);
                ctx.lineTo(20, -95);
                ctx.lineTo(15, -85);
                ctx.lineTo(-15, -85);
                ctx.closePath();
                ctx.fillStyle = '#00ff88'; // Green bright
                ctx.fill();
                ctx.shadowColor = '#00ff88';
                ctx.shadowBlur = 10;
                ctx.stroke();
                ctx.shadowBlur = 0;

                // --- BRAZOS (Typing posture) ---
                ctx.strokeStyle = '#00d9ff';
                ctx.lineWidth = 4;

                // Brazo izquierdo
                ctx.beginPath();
                ctx.moveTo(-35, -50);
                ctx.lineTo(-60, 0);
                ctx.lineTo(-30, 20); // Hand position
                ctx.stroke();

                // Brazo derecho
                ctx.beginPath();
                ctx.moveTo(35, -50);
                ctx.lineTo(60, 0);
                ctx.lineTo(30, 20); // Hand position
                ctx.stroke();

                ctx.restore();
            }
        }

        // Floating Code Symbols
        const symbols = ['{ }', '< >', '/>', '&&', '||', '[]', '()', '=>', '01', 'if'];
        class CodeSymbol {
            x: number;
            y: number;
            text: string;
            size: number;
            speed: number;
            opacity: number;

            constructor() {
                const width = canvas ? canvas.width : window.innerWidth;
                const height = canvas ? canvas.height : window.innerHeight;
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.text = symbols[Math.floor(Math.random() * symbols.length)];
                this.size = Math.random() * 14 + 10;
                this.speed = Math.random() * 0.5 + 0.1;
                this.opacity = Math.random() * 0.5 + 0.1;
            }

            update() {
                if (!canvas) return;
                this.y -= this.speed;
                if (this.y < 0) {
                    this.y = canvas.height;
                    this.x = Math.random() * canvas.width;
                    this.text = symbols[Math.floor(Math.random() * symbols.length)];
                }
            }

            draw() {
                if (!ctx) return;
                ctx.font = `bold ${this.size}px monospace`;
                ctx.fillStyle = `rgba(0, 217, 255, ${this.opacity})`; // Cyan text
                ctx.fillText(this.text, this.x, this.y);
            }
        }

        // Initialize objects
        let programmer = new Programmer3D();

        // Create more floating symbols
        const codeSymbols: CodeSymbol[] = [];
        for (let i = 0; i < 25; i++) {
            codeSymbols.push(new CodeSymbol());
        }

        // Animation Loop
        let animationFrameId: number;
        const render = (time: number) => {
            if (!ctx || !canvas) return;

            // Clear canvas with fade effect for trail? No, clean clear for crisp look
            // ctx.clearRect(0, 0, canvas.width, canvas.height); 
            // Use fillRect for slight trail if desired, but clean looks better with overlay
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw Grid Background (Cyber floor/ceiling)
            ctx.strokeStyle = 'rgba(0, 217, 255, 0.1)';
            ctx.lineWidth = 1;

            // Vertical grid lines
            for (let i = 0; i < canvas.width; i += 50) {
                ctx.beginPath();
                ctx.moveTo(i, 0);
                ctx.lineTo(i, canvas.height);
                ctx.stroke();
            }

            // Horizontal grid lines
            for (let i = 0; i < canvas.height; i += 50) {
                ctx.beginPath();
                ctx.moveTo(0, i);
                ctx.lineTo(canvas.width, i);
                ctx.stroke();
            }

            // Update and Draw Symbols
            codeSymbols.forEach(symbol => {
                symbol.update();
                symbol.draw();
            });

            // Update and Draw Programmer
            programmer.update(time);
            programmer.draw();

            animationFrameId = requestAnimationFrame(render);
        };

        render(0);

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full pointer-events-none z-0"
        />
    );
}
