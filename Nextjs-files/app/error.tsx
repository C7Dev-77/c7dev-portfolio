'use client';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-cyber-black text-white p-4">
            <h2 className="text-2xl font-orbitron text-red-500 mb-4">¡Error del Sistema!</h2>
            <p className="text-gray-400 font-mono text-sm mb-6 text-center max-w-md">
                {error.message || "Algo salió mal en la matrix."}
            </p>
            <button
                onClick={() => reset()}
                className="cyber-btn px-6 py-2 bg-neon-green text-black font-bold uppercase tracking-widest"
            >
                Reiniciar Sistema
            </button>
        </div>
    );
}
