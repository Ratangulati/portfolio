import { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [cursorType, setCursorType] = useState('default'); // 'default' | 'pointer' | 'view'
  const [visible, setVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Listen for menu open/close
  useEffect(() => {
    const checkMenu = () => {
      // Check if mobile menu is open (you can also pass this as a prop)
      const mobileMenu = document.querySelector('[data-mobile-menu]');
      setMenuOpen(!!mobileMenu);
    };

    // Check initially and on DOM changes
    checkMenu();
    const observer = new MutationObserver(checkMenu);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Only hide default cursor when menu is NOT open
    if (!menuOpen) {
      document.body.style.cursor = 'none';
    } else {
      document.body.style.cursor = 'auto'; // Show default cursor in menu
    }
    
    return () => { 
      document.body.style.cursor = ''; 
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);

      // Check for "view" cursor (project media)
      const viewTarget = e.target?.closest('[data-cursor="view"]');
      if (viewTarget) {
        setCursorType('view');
        return;
      }

      // Check for pointer cursor (links, buttons, etc.)
      const pointerTarget = e.target?.closest('a, button, [role="button"], input, textarea, select');
      if (pointerTarget) {
        setCursorType('pointer');
        return;
      }

      setCursorType('default');
    };

    const handleLeave = () => setVisible(false);

    document.addEventListener('mousemove', handleMove);
    document.body.addEventListener('mouseleave', handleLeave);

    return () => {
      document.removeEventListener('mousemove', handleMove);
      document.body.removeEventListener('mouseleave', handleLeave);
    };
  }, [visible]);

  // Hide custom cursor when mobile menu is open
  if (!visible || menuOpen) return null;

  const isView = cursorType === 'view';
  const isPointer = cursorType === 'pointer';

  // Sizes
  const dotSize = 8;
  const ringSize = isView ? 80 : isPointer ? 44 : 32;
  const ringOffset = ringSize / 2;

  return (
    <>
      {/* Dot — follows cursor exactly (hidden when showing VIEW) */}
      {!isView && (
        <div
          className="fixed top-0 left-0 rounded-full pointer-events-none bg-[#d1d1c7]"
          style={{
            width: dotSize,
            height: dotSize,
            transform: `translate(${position.x - dotSize / 2}px, ${position.y - dotSize / 2}px)`,
            zIndex: 999999, // Above everything
          }}
        />
      )}

      {/* Ring or VIEW badge */}
      <div
        className={`fixed top-0 left-0 rounded-full pointer-events-none transition-all duration-200 ease-out flex items-center justify-center ${
          isView 
            ? 'bg-white' 
            : 'border-2 border-[#d1d1c7]/70'
        }`}
        style={{
          width: ringSize,
          height: ringSize,
          transform: `translate(${position.x - ringOffset}px, ${position.y - ringOffset}px)`,
          zIndex: 999998, // Just below dot
        }}
      >
        {isView && (
          <span className="text-black font-semibold text-sm tracking-tight">VIEW</span>
        )}
      </div>
    </>
  );
};

export default CustomCursor;
