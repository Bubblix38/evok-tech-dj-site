import { lazy } from 'react';

// Lazy load heavy components to reduce initial bundle size
export const LazyBackgroundFX = lazy(() => import('../components/BackgroundFX'));
export const LazyRadioPlayer = lazy(() => import('../components/RadioPlayer'));
export const LazyRetroMusicEffects = lazy(() => import('../components/RetroMusicEffects'));

// Lazy load pages
export const LazyPackVideos = lazy(() => import('../pages/PackVideos'));
export const LazyFunkVideos = lazy(() => import('../pages/FunkVideos'));
export const LazyCursoDJ = lazy(() => import('../pages/CursoDJ'));

// Lazy load heavy UI components
export const LazyPackGrid = lazy(() => import('../components/PackGrid'));
export const LazyMusicPackCard = lazy(() => import('../components/MusicPackCard'));
export const LazyVideoProtection = lazy(() => import('../components/VideoProtection'));

// Preload function for better UX
export const preloadComponent = (componentLoader: () => Promise<any>) => {
  const componentImport = componentLoader();
  return componentImport;
};

// Intersection Observer for lazy loading
export const createIntersectionObserver = (
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
) => {
  const defaultOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1,
    ...options,
  };

  return new IntersectionObserver(callback, defaultOptions);
};

// Debounce function for performance
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle function for scroll events
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};