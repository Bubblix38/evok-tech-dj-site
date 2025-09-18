import { useEffect, useRef, useCallback } from 'react';

interface BackgroundFXProps {
  scope?: 'home' | 'funk' | 'all';
  density?: 'low' | 'med';
  enabled?: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  type: 'circle' | 'diamond';
  color: string;
  layer: 'back' | 'front';
  wiggleOffset: number;
  wigglePeriod: number;
  wiggleAmplitude: number;
  opacity: number;
  blur: number;
  baseY: number;
  drift: number;
}

const BackgroundFX = ({ scope = 'all', density = 'low', enabled = true }: BackgroundFXProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const lastTimeRef = useRef<number>(0);
  const isVisibleRef = useRef<boolean>(true);

  // Get CSS custom property values
  const getCSSVariable = useCallback((variable: string): string => {
    if (typeof window === 'undefined') return '';
    return getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
  }, []);

  // Check if reduced motion is preferred
  const prefersReducedMotion = useCallback((): boolean => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // Get responsive particle count
  const getParticleCount = useCallback((density: string): number => {
    const baseCount = density === 'med' ? 1.5 : 1;
    const width = window.innerWidth;
    
    if (width >= 1024) { // Desktop
      return Math.floor((35 + Math.random() * 15) * baseCount); // 35-50 for low, 52-75 for med
    } else if (width >= 768) { // Tablet
      return Math.floor((25 + Math.random() * 10) * baseCount); // 25-35 for low, 37-52 for med
    } else { // Mobile
      return Math.floor((15 + Math.random() * 8) * baseCount); // 15-23 for low, 22-34 for med
    }
  }, []);

  // Create a single particle
  const createParticle = useCallback((canvas: HTMLCanvasElement): Particle => {
    const isDiamond = Math.random() < 0.15; // 10-15% diamonds
    const isBackLayer = Math.random() < 0.5; // 50/50 split between layers
    const isPrimary = Math.random() < 0.7; // 70% primary color, 30% yellow
    
    // Get primary color from CSS variable - aumentando visibilidade
    const primaryHSL = getCSSVariable('--primary');
    const primaryColor = primaryHSL ? `hsl(${primaryHSL} / 0.20)` : 'hsl(280 75% 65% / 0.20)';
    const yellowColor = 'hsl(45 90% 55% / 0.16)';
    
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 2, // -1 to 1
      vy: (Math.random() - 0.5) * 2, // -1 to 1
      size: isDiamond ? 3 + Math.random() * 1 : 1 + Math.random() * 1.5, // diamonds 3-4px, circles 1-2.5px
      type: isDiamond ? 'diamond' : 'circle',
      color: isPrimary ? primaryColor : yellowColor,
      layer: isBackLayer ? 'back' : 'front',
      wiggleOffset: Math.random() * Math.PI * 2,
      wigglePeriod: 6000 + Math.random() * 4000, // 6-10 seconds
      wiggleAmplitude: 6 + Math.random() * 6, // 6-12px
      opacity: isBackLayer ? 0.12 : 0.18 + Math.random() * 0.08, // back: 0.12, front: 0.18-0.26
      blur: isBackLayer ? 1 : 0,
      baseY: Math.random() * canvas.height,
      drift: 12 + Math.random() * 28 // 12-40 px/s velocity range
    };
  }, [getCSSVariable]);

  // Initialize particles
  const initParticles = useCallback((canvas: HTMLCanvasElement) => {
    const count = Math.min(getParticleCount(density), 75); // Max 75 particles (aumentado de 40)
    particlesRef.current = Array.from({ length: count }, () => createParticle(canvas));
  }, [density, getParticleCount, createParticle]);

  // Update particle position
  const updateParticle = useCallback((particle: Particle, deltaTime: number, canvas: HTMLCanvasElement) => {
    const dt = deltaTime / 1000; // Convert to seconds
    
    // Apply parallax: back layer moves slower
    const parallaxMultiplier = particle.layer === 'back' ? 0.5 : 1.0;
    
    // Apply base velocity with drift and parallax
    particle.x += particle.vx * particle.drift * dt * parallaxMultiplier;
    particle.y += particle.vy * particle.drift * dt * parallaxMultiplier;
    
    // Apply sinusoidal wiggle with parallax
    const time = performance.now();
    const wigglePhase = (time / particle.wigglePeriod) * Math.PI * 2 + particle.wiggleOffset;
    const wiggleAmplitude = particle.wiggleAmplitude * (particle.layer === 'back' ? 0.7 : 1.0);
    const wiggleX = Math.sin(wigglePhase) * wiggleAmplitude * dt * parallaxMultiplier;
    const wiggleY = Math.cos(wigglePhase) * wiggleAmplitude * dt * parallaxMultiplier;
    
    particle.x += wiggleX;
    particle.y += wiggleY;
    
    // Wrap around screen edges
    if (particle.x < -particle.size) particle.x = canvas.width + particle.size;
    if (particle.x > canvas.width + particle.size) particle.x = -particle.size;
    if (particle.y < -particle.size) particle.y = canvas.height + particle.size;
    if (particle.y > canvas.height + particle.size) particle.y = -particle.size;
  }, []);

  // Draw a particle
  const drawParticle = useCallback((ctx: CanvasRenderingContext2D, particle: Particle) => {
    ctx.save();
    
    // Apply blur for back layer
    if (particle.blur > 0) {
      ctx.filter = `blur(${particle.blur}px)`;
    }
    
    // Set particle color and opacity
    ctx.fillStyle = particle.color;
    ctx.globalAlpha = particle.opacity;
    
    if (particle.type === 'circle') {
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size / 2, 0, Math.PI * 2);
      ctx.fill();
    } else if (particle.type === 'diamond') {
      const halfSize = particle.size / 2;
      ctx.beginPath();
      ctx.moveTo(particle.x, particle.y - halfSize);
      ctx.lineTo(particle.x + halfSize, particle.y);
      ctx.lineTo(particle.x, particle.y + halfSize);
      ctx.lineTo(particle.x - halfSize, particle.y);
      ctx.closePath();
      ctx.fill();
    }
    
    ctx.restore();
  }, []);

  // Animation loop
  const animate = useCallback((currentTime: number) => {
    const canvas = canvasRef.current;
    if (!canvas || !enabled || prefersReducedMotion()) {
      return;
    }
    
    // Pause animation when document is hidden
    if (!isVisibleRef.current) {
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      animationRef.current = requestAnimationFrame(animate);
      return;
    }

    const deltaTime = currentTime - lastTimeRef.current;
    lastTimeRef.current = currentTime;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Sort particles by layer (back first, then front)
    const sortedParticles = [...particlesRef.current].sort((a, b) => {
      return a.layer === 'back' ? -1 : 1;
    });

    // Update and draw particles
    sortedParticles.forEach(particle => {
      updateParticle(particle, deltaTime, canvas);
      drawParticle(ctx, particle);
    });

    animationRef.current = requestAnimationFrame(animate);
  }, [enabled, prefersReducedMotion, updateParticle, drawParticle]);

  // Handle canvas resize
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }

    // Reinitialize particles with new canvas size
    initParticles(canvas);
  }, [initParticles]);

  // Handle visibility change
  const handleVisibilityChange = useCallback(() => {
    isVisibleRef.current = !document.hidden;
    
    if (isVisibleRef.current) {
      // Resume animation when visible
      lastTimeRef.current = performance.now();
      animationRef.current = requestAnimationFrame(animate);
    } else {
      // Cancel animation when hidden
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = undefined;
      }
    }
  }, [animate]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !enabled) return;

    // Initial setup
    handleResize();

    // Start animation
    lastTimeRef.current = performance.now();
    animationRef.current = requestAnimationFrame(animate);

    // Event listeners
    window.addEventListener('resize', handleResize);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [enabled, animate, handleResize, handleVisibilityChange]);

  if (!enabled || prefersReducedMotion()) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
      {/* Canvas for particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{
          width: '100%',
          height: '100%',
        }}
      />
      
      {/* Scanlines overlay */}
      <div className="absolute inset-0 w-full h-full scanlines-overlay" />
    </div>
  );
};

export default BackgroundFX;