import { Music, Star, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { type MusicPack } from '@shared/schema';

interface BestSellersSectionProps {
  packs: MusicPack[];
  onPackPlay?: (packId: string) => void;
  onPackDownload?: (packId: string) => void;
  onPackClick?: (packId: string) => void;
}

const packThemes = [
  { bg: 'from-orange-600 to-red-600', accent: 'bg-orange-500' },
  { bg: 'from-blue-600 to-cyan-600', accent: 'bg-blue-500' },
  { bg: 'from-purple-600 to-pink-600', accent: 'bg-purple-500' },
  { bg: 'from-green-600 to-teal-600', accent: 'bg-green-500' },
];

export default function BestSellersSection({ 
  packs, 
  onPackPlay, 
  onPackDownload, 
  onPackClick 
}: BestSellersSectionProps) {
  // Show only first 4 packs for best sellers
  const bestSellerPacks = packs.slice(0, 4);

  if (bestSellerPacks.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <TrendingUp className="w-8 h-8 text-primary" />
            <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground">
              Packs Mais Vendidos
            </h2>
          </div>
          <p className="text-muted-foreground font-body text-lg max-w-2xl mx-auto">
            Os packs favoritos da nossa comunidade de DJs
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellerPacks.map((pack, index) => {
            const theme = packThemes[index % packThemes.length];
            
            return (
              <Card 
                key={pack.id}
                className="relative overflow-hidden cursor-pointer group hover:scale-105 transition-all duration-300 hover:shadow-2xl h-80"
                onClick={() => onPackClick?.(pack.id)}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${theme.bg} opacity-90`} />
                
                {/* Content */}
                <div className="relative z-10 p-6 h-full flex flex-col justify-between text-white">
                  {/* Header */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-semibold opacity-80">Pack</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className={`px-2 py-1 ${theme.accent} text-white text-xs font-bold rounded`}>
                          THE BEST
                        </span>
                      </div>
                    </div>
                    
                    <h3 className="font-display font-bold text-xl mb-2 leading-tight">
                      {pack.title}
                    </h3>
                    
                    <p className="text-white/80 font-body text-sm mb-4">
                      {pack.artist}
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
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
                        <span className="text-xl font-bold">R$ 50,00</span>
                        <span className="text-sm text-white/60 line-through ml-2">R$ 75,00</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 mt-4">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onPackPlay?.(pack.id);
                      }}
                    >
                      Comprar
                    </Button>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 w-12 h-12 bg-white/10 rounded-full opacity-50" />
                <div className="absolute bottom-4 left-4 w-6 h-6 bg-white/10 rounded-full opacity-30" />
                
                {/* Bestseller Badge */}
                <div className="absolute top-0 right-0 bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-bl-lg">
                  #{index + 1}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8"
          >
            Ver Todos os Packs
          </Button>
        </div>
      </div>
    </section>
  );
}