import { useEffect } from 'react';

export function useGlowPointer() {
  useEffect(() => {
    const UPDATE = (e) => {
      // Usa clientX/clientY para coordenadas relativas ao viewport
      const x = e.clientX;
      const y = e.clientY;
      
      document.documentElement.style.setProperty('--x', x.toFixed(2));
      document.documentElement.style.setProperty('--xp', (x / window.innerWidth).toFixed(2));
      document.documentElement.style.setProperty('--y', y.toFixed(2));
      document.documentElement.style.setProperty('--yp', (y / window.innerHeight).toFixed(2));
    };
    
    document.body.addEventListener('pointermove', UPDATE);
    
    return () => {
      document.body.removeEventListener('pointermove', UPDATE);
    };
  }, []);
}

