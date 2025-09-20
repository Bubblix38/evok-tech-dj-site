import React, { useState, useRef, useEffect } from 'react';
import { getOptimizedImageUrl, generateSrcSet } from '@/utils/cdn-config';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  width?: number;
  height?: number;
  useCDN?: boolean;
  responsive?: boolean;
  onLoad?: () => void;
  onError?: () => void;
  [key: string]: any;
}

export default function LazyImage({ 
  src, 
  alt, 
  className = "", 
  placeholder = "Carregando...",
  width,
  height,
  useCDN = true,
  responsive = true,
  onLoad,
  onError,
  ...props 
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Get optimized image URL if CDN is enabled
  const imageName = src.split('/').pop() || src;
  const optimizedSrc = useCDN ? getOptimizedImageUrl(imageName, width) : src;
  const srcSet = useCDN && responsive ? generateSrcSet(imageName) : undefined;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px"
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${className}`}>
      {/* Placeholder */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-br from-muted/50 to-muted animate-pulse flex items-center justify-center">
          {placeholder && (
            <div className="text-muted-foreground text-sm font-body">
              {placeholder}
            </div>
          )}
        </div>
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 bg-muted/30 flex items-center justify-center">
          <div className="text-muted-foreground text-sm font-body text-center">
            Erro ao carregar imagem
          </div>
        </div>
      )}

      {/* Actual image */}
      {isInView && (
        <img
          src={optimizedSrc}
          srcSet={srcSet}
          sizes={responsive ? "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" : undefined}
          alt={alt}
          width={width}
          height={height}
          className={`transition-opacity duration-300 ${
            isLoaded ? "opacity-100" : "opacity-0"
          } ${className}`}
          onLoad={handleLoad}
          onError={handleError}
          {...props}
        />
      )}
    </div>
  );
}