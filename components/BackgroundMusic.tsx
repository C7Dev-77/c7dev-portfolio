'use client';

import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function BackgroundMusic() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [playerReady, setPlayerReady] = useState(false);
    const playerRef = useRef<any>(null);

    useEffect(() => {
        // Cargar la API de YouTube de forma asíncrona
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

        // Inicializar reproductor cuando la API esté lista
        window.onYouTubeIframeAPIReady = () => {
            playerRef.current = new window.YT.Player('youtube-player', {
                height: '0',
                width: '0',
                videoId: 'h9JFYxXOnNg', // Tu video: 100K special - cyberpunk music
                playerVars: {
                    'playsinline': 1,
                    'controls': 0,
                    'loop': 1,
                    'playlist': 'h9JFYxXOnNg', // Necesario para el loop
                    'disablekb': 1,
                    'fs': 0,
                    'rel': 0
                },
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange
                }
            });
        };

        return () => {
            // No destruimos el player para mantener estado si cambia ruta
        };
    }, []);

    const onPlayerReady = (event: any) => {
        setPlayerReady(true);
        // Establecer volumen inicial bajo (30%)
        event.target.setVolume(30);
    };

    const onPlayerStateChange = (event: any) => {
        // Si termina (estado 0), intentar reproducir de nuevo si no lo hace el loop nativo
        if (event.data === 0) {
            playerRef.current?.playVideo();
        }
    };

    const toggleMusic = () => {
        if (!playerRef.current || !playerReady) return;

        if (isPlaying) {
            playerRef.current.pauseVideo();
            setIsPlaying(false);
        } else {
            playerRef.current.playVideo();
            setIsPlaying(true);
        }
    };

    return (
        <>
            <div id="youtube-player" className="hidden"></div>

            <button
                onClick={toggleMusic}
                className={`fixed bottom-8 right-8 z-50 p-4 bg-black/90 border rounded-full transition-all group
          ${isPlaying
                        ? 'border-neon-gold shadow-[0_0_20px_rgba(255,215,0,0.3)]'
                        : 'border-neon-gold/40 hover:border-neon-gold'
                    }`}
                title={isPlaying ? 'Pausar música' : 'Reproducir música'}
                disabled={!playerReady}
                aria-label={isPlaying ? 'Pausar música de fondo' : 'Reproducir música de fondo'}
            >
                {isPlaying ? (
                    <Volume2 className="w-5 h-5 text-neon-gold animate-pulse" />
                ) : (
                    <VolumeX className="w-5 h-5 text-gray-400 group-hover:text-neon-gold transition-colors" />
                )}
            </button>
        </>
    );
}

// Declaración de tipos global para TS
declare global {
    interface Window {
        onYouTubeIframeAPIReady: () => void;
        YT: any;
    }
}
