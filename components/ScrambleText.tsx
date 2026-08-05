'use client';

import { useState, useEffect } from 'react';

interface ScrambleTextProps {
    text: string;
    className?: string;
    duration?: number;
}

export default function ScrambleText({ text, className = "", duration = 2000 }: ScrambleTextProps) {
    const [displayText, setDisplayText] = useState('');
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&';

    useEffect(() => {
        let startTime: number;
        let animationFrame: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const progressRatio = Math.min(progress / duration, 1);

            // Determine how many characters should be revealed based on progress
            const revealIndex = Math.floor(text.length * progressRatio);

            const scrambled = text
                .split('')
                .map((char, i) => {
                    if (i < revealIndex) return char;
                    if (char === ' ') return ' ';
                    return chars[Math.floor(Math.random() * chars.length)];
                })
                .join('');

            setDisplayText(scrambled);

            if (progress < duration) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrame);
    }, [text, duration]);

    return (
        <span className={className}>
            {displayText}
        </span>
    );
}
