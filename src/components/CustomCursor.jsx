import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  
  useEffect(() => {
    // Double-check: Don't run on mobile/touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isSmallScreen = window.innerWidth < 768;
    
    if (isTouchDevice || isSmallScreen) {
      return; // Exit early on mobile
    }

    const cursor = cursorRef.current;
    if (!cursor) return;

    const moveCursor = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: 'power2.out',
      });
    };

    const handleMouseEnter = () => {
      gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.3 });
    };

    const handleMouseLeave = () => {
      gsap.to(cursor, { scale: 0, opacity: 0, duration: 0.3 });
    };

    window.addEventListener('mousemove', moveCursor);
    document.body.addEventListener('mouseenter', handleMouseEnter);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="custom-cursor"
      style={{
        position: 'fixed',
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        border: '2px solid rgba(255, 255, 255, 0.8)',
        pointerEvents: 'none',
        zIndex: 9999,
        mixBlendMode: 'difference',
        transform: 'translate(-50%, -50%)',
        opacity: 0,
        willChange: 'transform',
      }}
    />
  );
};

export default CustomCursor;
