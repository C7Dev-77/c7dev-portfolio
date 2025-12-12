// components/GlitchText.tsx
'use client';

interface GlitchTextProps {
  text: string;
  className?: string;
}

export default function GlitchText({ text, className = "" }: GlitchTextProps) {
  return (
    <span
      className={`glitch ${className}`}
      data-text={text}
    >
      {text}
    </span>
  );
}