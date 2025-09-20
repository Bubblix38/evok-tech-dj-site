import { Request, Response, NextFunction } from 'express';

// CDN Cache Headers Middleware
export const cdnCacheHeaders = (req: Request, res: Response, next: NextFunction) => {
  // Check if the request is for static assets
  const isStaticAsset = /\.(js|css|png|jpg|jpeg|gif|svg|webp|ico|woff|woff2|ttf|eot)$/i.test(req.path);
  
  if (isStaticAsset) {
    // Set cache headers for static assets
    const oneYear = 365 * 24 * 60 * 60; // 1 year in seconds
    const oneDay = 24 * 60 * 60; // 1 day in seconds
    
    // Different cache strategies for different asset types
    if (/\.(png|jpg|jpeg|gif|svg|webp|ico)$/i.test(req.path)) {
      // Images - cache for 1 year
      res.set({
        'Cache-Control': `public, max-age=${oneYear}, immutable`,
        'Expires': new Date(Date.now() + oneYear * 1000).toUTCString(),
        'ETag': `"${Date.now()}"`,
        'Vary': 'Accept-Encoding',
        'X-Content-Type-Options': 'nosniff'
      });
    } else if (/\.(js|css)$/i.test(req.path)) {
      // JS/CSS - cache for 1 year with versioning
      res.set({
        'Cache-Control': `public, max-age=${oneYear}, immutable`,
        'Expires': new Date(Date.now() + oneYear * 1000).toUTCString(),
        'ETag': `"${Date.now()}"`,
        'Vary': 'Accept-Encoding'
      });
    } else if (/\.(woff|woff2|ttf|eot)$/i.test(req.path)) {
      // Fonts - cache for 1 year
      res.set({
        'Cache-Control': `public, max-age=${oneYear}, immutable`,
        'Access-Control-Allow-Origin': '*',
        'Vary': 'Accept-Encoding'
      });
    }
    
    // Add CDN-friendly headers
    res.set({
      'X-CDN-Cache': 'HIT',
      'X-Cache-Status': 'CACHED',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    });
  } else {
    // For HTML and API responses - shorter cache
    res.set({
      'Cache-Control': 'public, max-age=300, s-maxage=3600', // 5 min browser, 1 hour CDN
      'Vary': 'Accept-Encoding, Accept'
    });
  }
  
  next();
};

// Compression middleware for CDN
export const cdnCompression = (req: Request, res: Response, next: NextFunction) => {
  // Add compression hints for CDN
  const acceptEncoding = req.headers['accept-encoding'] || '';
  
  if (acceptEncoding.includes('br')) {
    res.set('Content-Encoding', 'br');
  } else if (acceptEncoding.includes('gzip')) {
    res.set('Content-Encoding', 'gzip');
  }
  
  next();
};

// Security headers for CDN
export const cdnSecurityHeaders = (req: Request, res: Response, next: NextFunction) => {
  res.set({
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
  });
  
  next();
};