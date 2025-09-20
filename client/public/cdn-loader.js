// CDN Loader for production builds
(function() {
  'use strict';
  
  // Check if we're in production mode
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return; // Skip CDN loading in development
  }
  
  // Load React and ReactDOM from CDN
  const loadScript = (src, onLoad) => {
    const script = document.createElement('script');
    script.src = src;
    script.crossOrigin = 'anonymous';
    script.onload = onLoad;
    script.onerror = () => {
      console.error('Failed to load script:', src);
    };
    document.head.appendChild(script);
  };
  
  // Load React first, then ReactDOM
  loadScript('https://unpkg.com/react@18.3.1/umd/react.production.min.js', () => {
    loadScript('https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js', () => {
      console.log('React and ReactDOM loaded from CDN');
      
      // Dispatch event to signal CDN libraries are ready
      window.dispatchEvent(new CustomEvent('cdnLibrariesReady'));
    });
  });
  
  // Preload other common libraries
  const preloadLibraries = [
    'https://unpkg.com/framer-motion@11.13.1/dist/framer-motion.js',
    'https://unpkg.com/lucide-react@0.453.0/dist/umd/lucide-react.js'
  ];
  
  preloadLibraries.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'script';
    link.href = src;
    document.head.appendChild(link);
  });
})();