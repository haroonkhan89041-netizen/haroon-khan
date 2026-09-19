import React, { useEffect, useState } from 'react';
import { useNexus } from '../../context/NexusContext';

export const CustomCursor: React.FC = () => {
  const { cursorLabel, reducedMotion } = useNexus();
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [clicking, setClicking] = useState(false);

  useEffect(() => {
    // Only show custom cursor on fine pointer devices (desktops)
    const checkFinePointer = () => {
      const hasFinePointer = window.matchMedia('(pointer: fine)').matches && window.innerWidth >= 1024;
      setIsDesktop(hasFinePointer);
    };

    checkFinePointer();
    window.addEventListener('resize', checkFinePointer);

    const onMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };

    const onMouseDown = () => setClicking(true);
    const onMouseUp = () => setClicking(false);
    const onMouseLeave = () => setVisible(false);
    const onMouseEnter = () => setVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.body.addEventListener('mouseleave', onMouseLeave);
    document.body.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('resize', checkFinePointer);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.body.removeEventListener('mouseleave', onMouseLeave);
      document.body.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [visible]);

  if (!isDesktop || reducedMotion || !visible) return null;

  const isExpanded = !!cursorLabel;

  return (
    <div
      className="pointer-events-none fixed z-50 transition-transform duration-75 ease-out select-none"
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        left: 0,
        top: 0,
      }}
      aria-hidden="true"
    >
      {isExpanded ? (
        <div
          className={`-translate-x-1/2 -translate-y-1/2 px-3.5 py-1.5 rounded-full flex items-center justify-center font-mono text-[11px] font-semibold tracking-wider text-[#F5F5FA] border border-[#39D9FF]/40 bg-[#0A0A14]/90 backdrop-blur-md shadow-[0_0_20px_rgba(57,217,255,0.35)] transition-all duration-200 ${
            clicking ? 'scale-90' : 'scale-100'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#39D9FF] mr-2 animate-ping" />
          {cursorLabel}
        </div>
      ) : (
        <div className="-translate-x-1/2 -translate-y-1/2 relative flex items-center justify-center">
          {/* Outer halo */}
          <div
            className={`w-7 h-7 rounded-full border border-[#7C5CFF]/40 transition-transform duration-300 ${
              clicking ? 'scale-75 border-[#39D9FF]' : 'scale-100'
            }`}
          />
          {/* Luminous center point */}
          <div
            className={`absolute w-1.5 h-1.5 rounded-full bg-[#39D9FF] shadow-[0_0_8px_#39D9FF] transition-all duration-150 ${
              clicking ? 'scale-150 bg-[#D85CFF]' : 'scale-100'
            }`}
          />
        </div>
      )}
    </div>
  );
};
