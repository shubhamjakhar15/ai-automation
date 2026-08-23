import { motion } from 'framer-motion';
import { useRef, useState } from 'react';

export default function AnimatedButton({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  href,
  ...props
}) {
  const buttonRef = useRef(null);
  const [ripple, setRipple] = useState(null);

  const handleClick = (e) => {
    const rect = buttonRef.current.getBoundingClientRect();
    setRipple({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      id: Date.now(),
    });
    setTimeout(() => setRipple(null), 600);
    onClick?.(e);
  };

  const baseClasses = 'relative overflow-hidden inline-flex items-center justify-center font-semibold transition-all duration-300 cursor-pointer rounded-xl font-[family-name:var(--font-heading)]';

  const variants = {
    primary:
      'bg-accent text-bg-primary hover:shadow-[0_0_40px_rgba(255,122,0,0.4)] hover:scale-[1.02]',
    secondary:
      'bg-transparent text-text-primary border border-border hover:border-accent/40 hover:bg-white/5 hover:scale-[1.02]',
    ghost:
      'bg-transparent text-text-muted hover:text-text-primary hover:bg-white/5',
  };

  const sizes = {
    sm: 'px-5 py-2.5 text-sm gap-2',
    md: 'px-7 py-3.5 text-[15px] gap-2.5',
    lg: 'px-9 py-4.5 text-base gap-3',
  };

  const Component = href ? motion.a : motion.button;

  return (
    <Component
      ref={buttonRef}
      href={href}
      onClick={handleClick}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      whileTap={{ scale: 0.97 }}
      {...props}
    >
      {ripple && (
        <motion.span
          className="absolute rounded-full bg-white/20 pointer-events-none"
          style={{ left: ripple.x, top: ripple.y }}
          initial={{ width: 0, height: 0, opacity: 0.5, x: 0, y: 0 }}
          animate={{ width: 300, height: 300, opacity: 0, x: -150, y: -150 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      )}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </Component>
  );
}
