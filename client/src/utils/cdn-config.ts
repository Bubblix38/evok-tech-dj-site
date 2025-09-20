// CDN Configuration for assets
export const CDN_CONFIG = {
  // CDN base URLs
  images: {
    primary: 'https://cdn.jsdelivr.net/gh/your-username/your-repo@main/attached_assets/generated_images/',
    fallback: '/assets/generated_images/'
  },
  
  // Asset optimization settings
  imageOptimization: {
    quality: 80,
    format: 'webp',
    sizes: [320, 640, 768, 1024, 1280, 1920]
  },
  
  // Cache settings
  cache: {
    maxAge: 31536000, // 1 year in seconds
    staleWhileRevalidate: 86400 // 1 day in seconds
  }
};

// Helper function to get optimized image URL
export const getOptimizedImageUrl = (
  imageName: string, 
  width?: number, 
  quality: number = CDN_CONFIG.imageOptimization.quality
): string => {
  const isProduction = window.location.hostname !== 'localhost' && 
                      window.location.hostname !== '127.0.0.1';
  
  if (!isProduction) {
    // In development, use local assets
    return `${CDN_CONFIG.images.fallback}${imageName}`;
  }
  
  // In production, use CDN with optimization parameters
  const baseUrl = CDN_CONFIG.images.primary;
  const params = new URLSearchParams();
  
  if (width) {
    params.append('w', width.toString());
  }
  
  params.append('q', quality.toString());
  params.append('f', 'webp');
  
  return `${baseUrl}${imageName}?${params.toString()}`;
};

// Helper function to generate srcset for responsive images
export const generateSrcSet = (imageName: string): string => {
  return CDN_CONFIG.imageOptimization.sizes
    .map(size => `${getOptimizedImageUrl(imageName, size)} ${size}w`)
    .join(', ');
};

// Preload critical images
export const preloadCriticalImages = (imageNames: string[]): void => {
  imageNames.forEach(imageName => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = getOptimizedImageUrl(imageName, 1920);
    document.head.appendChild(link);
  });
};