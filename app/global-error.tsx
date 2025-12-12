'use client';

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <html>
            <body className="bg-cyber-black text-white flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <h2 className="text-3xl font-orbitron text-red-500 mb-4">CRITICAL ERROR</h2>
                    <p className="text-gray-400 font-mono mb-6">Error global de aplicación detectado.</p>
                    <button onClick={() => reset()} className="px-4 py-2 bg-red-500 text-white font-bold">REINICIAR</button>
                </div>
            </body>
        </html>
    );
}
