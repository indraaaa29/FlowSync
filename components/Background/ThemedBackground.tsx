'use client';

import { useEffect, useState } from 'react';
import { useTheme } from '@/components/ThemeProvider';
import ColorBends from './ColorBends';

export default function ThemedBackground() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const darkColors = ["#5227FF", "#FF9FFC", "#7cff67"];
  const lightColors = ["#4F46E5", "#F97316", "#22C55E"];
  const currentColors = theme === 'dark' ? darkColors : lightColors;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        overflow: 'hidden',
        opacity: 0.5,
        backdropFilter: 'blur(1px)',
        WebkitBackdropFilter: 'blur(1px)',
      }}
    >
      <ColorBends
        rotation={45}
        speed={0}
        colors={currentColors}
        transparent
        autoRotate={0.5}
        scale={1}
        frequency={1}
        warpStrength={1}
        mouseInfluence={1}
        parallax={5}
        noise={0}
      />
    </div>
  );
}