import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Download, Music } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { type MusicPack } from '@shared/schema';

interface FeaturedPacksCarouselProps {
  packs: MusicPack[];
  onPackPlay?: (packId: string) => void;
  onPackDownload?: (packId: string) => void;
  onPackClick?: (packId: string) => void;
}

const packThemes = [
  { bg: 'from-yellow-600 to-orange-600', accent: 'bg-yellow-500' },
  { bg: 'from-orange-600 to-red-600', accent: 'bg-orange-500' },
  { bg: 'from-blue-600 to-cyan-600', accent: 'bg-blue-500' },
  { bg: 'from-purple-600 to-pink-600', accent: 'bg-purple-500' },
  { bg: 'from-green-600 to-teal-600', accent: 'bg-green-500' },
];

export default function FeaturedPacksCarousel({ 
  packs, 
  onPackPlay, 
  onPackDownload, 
  onPackClick 
}: FeaturedPacksCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % Math.max(1, packs.length - 3));
    }, 5000);

    return () => clearInterval(interval);
  }, [packs.length]);

  const scrollToIndex = (index: number) => {
    setCurrentIndex(index);
    if (carouselRef.current) {
      const cardWidth = 240; // Reduced card width
      carouselRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      });
    }
  };

  const nextSlide = () => {
    const maxIndex = Math.max(0, packs.length - 4);
    const newIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
    scrollToIndex(newIndex);
  };

  const prevSlide = () => {
    const maxIndex = Math.max(0, packs.length - 4);
    const newIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
    scrollToIndex(newIndex);
  };

  if (packs.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Music className="w-8 h-8 text-primary" />
            <h2 className="font-display font-bold text-4xl md:text-5xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Featured Packs
            </h2>
          </div>
          <p className="text-muted-foreground font-body text-lg max-w-2xl mx-auto">
            Nossos packs mais populares e lançamentos exclusivos
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm border-border/50 hover:bg-background/90"
            onClick={prevSlide}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm border-border/50 hover:bg-background/90"
            onClick={nextSlide}
          >
            <ChevronRight className="w-5 h-5" />
          </Button>

          {/* Carousel */}
          <div 
            ref={carouselRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth px-12"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {packs.map((pack, index) => {
              const theme = packThemes[index % packThemes.length];
              
              return (
                <Card 
                  key={pack.id}
                  className="flex-shrink-0 w-60 h-72 relative overflow-hidden cursor-pointer group hover:scale-105 transition-all duration-300 hover:shadow-2xl"
                  onClick={() => onPackClick?.(pack.id)}
                >
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${theme.bg} opacity-90`} />
                  
                  {/* Content */}
                  <div className="relative z-10 p-4 h-full flex flex-col justify-between text-white">
                    {/* Header */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-semibold opacity-80">Pack</span>
                        {pack.featured && (
                          <span className={`px-2 py-1 ${theme.accent} text-white text-xs font-bold rounded`}>
                            THE BEST
                          </span>
                        )}
                      </div>
                      
                      <h3 className="font-display font-bold text-lg mb-2 leading-tight">
                        {pack.title}
                      </h3>
                      
                      <p className="text-white/80 font-body text-xs mb-3">
                        {pack.artist}
                      </p>
                    </div>

                    {/* Stats */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                            <Music className="w-3 h-3" />
                          </div>
                          {pack.tracks} músicas
                        </span>
                        <span className="text-white/80">{pack.duration}</span>
                      </div>
                      
                      {/* Price */}
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-lg font-bold">R$ 50,00</span>
                          <span className="text-xs text-white/60 line-through ml-2">R$ 75,00</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 mt-3">
                      <Button
                        size="sm"
                        className="flex-1 bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm text-xs"
                        onClick={(e) => {
                          e.stopPropagation();
                          onPackPlay?.(pack.id);
                        }}
                      >
                        <Play className="w-3 h-3 mr-1" />
                        Preview
                      </Button>
                      
                      <Button
                        size="sm"
                        className="bg-white text-gray-900 hover:bg-white/90 px-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          onPackDownload?.(pack.id);
                        }}
                      >
                        <Download className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute top-3 right-3 w-10 h-10 bg-white/10 rounded-full opacity-50" />
                  <div className="absolute bottom-3 left-3 w-6 h-6 bg-white/10 rounded-full opacity-30" />
                </Card>
              );
            })}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: Math.max(1, packs.length - 3) }).map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-primary scale-125' 
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
                onClick={() => scrollToIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}