import { useEffect } from 'react';
import { preloadCriticalImages } from '@/utils/cdn-config';

// Hook for preloading critical CDN resources
export const useCDNPreload = () => {
  useEffect(() => {
    // Preload critical images
    const criticalImages = [
      '90s_music_hero_background_d7797857.png',
      '90s_remix_pack_cover_cf424b48.png',
      'music_video_thumbnail_design_4769ff88.png'
    ];
    
    preloadCriticalImages(criticalImages);
    
    // Let Google Fonts handle font loading automatically
    // The fonts are already loaded via the CSS link in index.html
    // This avoids potential URL conflicts and CORS issues
    
    // Setup service worker for CDN caching if supported
    if ('serviceWorker' in navigator && 'caches' in window) {
      navigator.serviceWorker.register('/sw.js').catch(() => {
        // Service worker registration failed, continue without it
      });
    }
    
  }, []);
  
  // Return CDN status and utilities
  return {
    isSupported: 'fetch' in window && 'Promise' in window,
    preloadResource: (url: string, type: 'image' | 'script' | 'style' = 'image') => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = type;
      link.href = url;
      if (type === 'script') {
        link.crossOrigin = 'anonymous';
      }
      document.head.appendChild(link);
    }
  };
};