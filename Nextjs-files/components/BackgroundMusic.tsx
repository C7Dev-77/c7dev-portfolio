'use client';

import { useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useMusic } from '@/context/MusicContext';

export default function BackgroundMusic() {
    const { isPlaying, isReady, toggleMusic, setPlayerReady } = useMusic();
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

    // Sincronizar el reproductor con el estado del contexto
    useEffect(() => {
        if (playerRef.current && isReady) {
            if (isPlaying) {
                playerRef.current.playVideo();
            } else {
                playerRef.current.pauseVideo();
            }
        }
    }, [isPlaying, isReady]);

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

    return (
        <div id="youtube-player" className="hidden"></div>
    );
}

// Declaración de tipos global para TS
declare global {
    interface Window {
        onYouTubeIframeAPIReady: () => void;
        YT: any;
    }
}
