import React, { useRef, useState } from 'react';
import { useNexus } from '../../context/NexusContext';

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'glass' | 'ghost';
  cursorLabel?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  ariaLabel?: string;
  id?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  onClick,
  className = '',
  variant = 'primary',
  cursorLabel = 'SELECT',
  disabled = false,
  type = 'button',
  ariaLabel,
  id,
}) => {
  const { setCursorLabel, reducedMotion } = useNexus();
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (reducedMotion || disabled || !buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * 0.28;
    const deltaY = (e.clientY - centerY) * 0.28;
    setOffset({ x: deltaX, y: deltaY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (cursorLabel) setCursorLabel(cursorLabel);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setOffset({ x: 0, y: 0 });
    setCursorLabel(null);
  };

  let baseStyles =
    'relative inline-flex items-center justify-center font-mono text-xs uppercase tracking-widest transition-all duration-300 select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#39D9FF] disabled:opacity-40 disabled:cursor-not-allowed';

  let variantStyles = '';
  switch (variant) {
    case 'primary':
      variantStyles =
        'px-6 py-3 rounded-full bg-[#7C5CFF] text-[#F5F5FA] font-semibold shadow-[0_0_30px_rgba(124,92,255,0.4)] hover:bg-[#8D70FF] hover:shadow-[0_0_40px_rgba(124,92,255,0.6)] hover:border-[#39D9FF]/40 border border-[#7C5CFF]/60';
      break;
    case 'secondary':
      variantStyles =
        'px-6 py-3 rounded-full bg-[#0A0A14] text-[#F5F5FA] border border-[#7C5CFF]/30 hover:border-[#39D9FF]/70 hover:bg-[#121222] hover:shadow-[0_0_25px_rgba(57,217,255,0.25)]';
      break;
    case 'glass':
      variantStyles =
        'px-5 py-2.5 rounded-full bg-[#0A0A14]/70 backdrop-blur-md text-[#F5F5FA] border border-[#7C5CFF]/20 hover:border-[#39D9FF]/50 hover:bg-[#151528]/80';
      break;
    case 'ghost':
      variantStyles =
        'px-4 py-2 text-[#9292A5] hover:text-[#F5F5FA] hover:bg-[#7C5CFF]/10 rounded-full transition-colors';
      break;
  }

  return (
    <button
      ref={buttonRef}
      id={id}
      type={type}
      disabled={disabled}
      aria-label={ariaLabel}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`${baseStyles} ${variantStyles} ${className}`}
      style={{
        transform: reducedMotion ? 'none' : `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        transition: isHovered ? 'transform 0.1s ease-out, box-shadow 0.3s, background-color 0.3s, border-color 0.3s' : 'transform 0.4s ease-out, box-shadow 0.3s, background-color 0.3s, border-color 0.3s',
      }}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
};
