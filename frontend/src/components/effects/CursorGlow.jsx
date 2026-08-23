import { useEffect, useRef } from 'react';
import { useMousePosition } from '../../hooks/useMousePosition';

export default function CursorGlow() {
  const { x, y } = useMousePosition();
  const glowRef = useRef(null);

  useEffect(() => {
    if (glowRef.current) {
      glowRef.current.style.transform = `translate(${x - 200}px, ${y - 200}px)`;
    }
  }, [x, y]);

  return (
    <div
      ref={glowRef}
      className="fixed top-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none z-[9998] will-change-transform hidden md:block"
      style={{
        background: 'radial-gradient(circle, rgba(255,122,0,0.08) 0%, rgba(255,122,0,0.02) 40%, transparent 70%)',
        transition: 'transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    />
  );
}
