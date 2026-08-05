'use client';

import React, { createContext, useContext, useState } from 'react';

interface MusicContextType {
    isPlaying: boolean;
    isReady: boolean;
    toggleMusic: () => void;
    setPlayerReady: (ready: boolean) => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export function MusicProvider({ children }: { children: React.ReactNode }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isReady, setPlayerReady] = useState(false);

    const toggleMusic = () => {
        if (!isReady) return;
        setIsPlaying(prev => !prev);
    };

    return (
        <MusicContext.Provider value={{ isPlaying, isReady, toggleMusic, setPlayerReady }}>
            {children}
        </MusicContext.Provider>
    );
}

export function useMusic() {
    const context = useContext(MusicContext);
    if (context === undefined) {
        throw new Error('useMusic must be used within a MusicProvider');
    }
    return context;
}
