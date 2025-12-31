import { useEffect } from 'react';

export function useGlowPointer() {
  useEffect(() => {
    let rafId = null;
    let lastX = 0;
    let lastY = 0;
    
    const UPDATE = (e) => {
      // Throttle usando requestAnimationFrame para limitar a 60fps
      if (rafId !== null) return;
      
      rafId = requestAnimationFrame(() => {
        // Usa clientX/clientY para coordenadas relativas ao viewport
        const x = e.clientX;
        const y = e.clientY;
        
        // Só atualiza se houver movimento significativo (reduz atualizações desnecessárias)
        const deltaX = Math.abs(x - lastX);
        const deltaY = Math.abs(y - lastY);
        
        if (deltaX > 0.5 || deltaY > 0.5) {
          document.documentElement.style.setProperty('--x', x.toFixed(2));
          document.documentElement.style.setProperty('--xp', (x / window.innerWidth).toFixed(2));
          document.documentElement.style.setProperty('--y', y.toFixed(2));
          document.documentElement.style.setProperty('--yp', (y / window.innerHeight).toFixed(2));
          
          lastX = x;
          lastY = y;
        }
        
        rafId = null;
      });
    };
    
    document.body.addEventListener('pointermove', UPDATE, { passive: true });
    
    return () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      document.body.removeEventListener('pointermove', UPDATE);
    };
  }, []);
}

