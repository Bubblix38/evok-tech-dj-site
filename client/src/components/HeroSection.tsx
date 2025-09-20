import { Button } from "@/components/ui/button";
import { Download, Play, ExternalLink } from "lucide-react";
import { useState } from "react";
import { getOptimizedImageUrl } from "@/utils/cdn-config";
import BackgroundFX from "./BackgroundFX";
import { useRadio } from "@/contexts/RadioContext";

interface HeroSectionProps {
  onPlayPreview?: () => void;
  onDownload?: () => void;
}

export default function HeroSection({ onPlayPreview, onDownload }: HeroSectionProps) {
  const { isPlaying, togglePlay } = useRadio();
  
  // Get optimized background image URL - using direct path for better compatibility
  const optimizedBgUrl = getOptimizedImageUrl('90s_music_hero_background_d7797857.png', 1920);
  
  // Fallback image path for development
  const fallbackBgUrl = '/attached_assets/generated_images/90s_music_hero_background_d7797857.png';
  
  return (
    <section 
      className="relative min-h-[70vh] flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)), url(${optimizedBgUrl}), url(${fallbackBgUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Background Effects */}
      <BackgroundFX />

      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/10 rounded-full animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-chart-2/10 rounded-full animate-pulse delay-1000" />
        <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-chart-3/10 rounded-full animate-pulse delay-2000" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Heading */}
          <h1 className="font-display font-black text-5xl md:text-7xl lg:text-8xl text-white mb-6 leading-none mt-8">
            <span className="bg-gradient-to-r from-primary via-chart-2 to-chart-3 bg-clip-text text-transparent">
              EVOK TECH DJ
            </span>
          </h1>

          {/* Subtitle */}
          <div className="space-y-3 mb-8">
            <p className="text-xl md:text-2xl text-white/90 font-body">
              Relive the golden era of music with Evok Tech DJ!
            </p>
            <p className="text-lg md:text-xl text-white/80 font-body">
              Iconic 90s anthems remixed with a fresh, modern sound
            </p>
            <p className="text-base md:text-lg text-white/70 font-body italic">
              Revive la mejor época musical con Evok Tech DJ!
            </p>
          </div>



          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-body font-semibold px-8 py-6 text-lg backdrop-blur-sm hover-elevate active-elevate-2"
              onClick={onDownload}
              data-testid="button-download-pack"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Pack
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              className="bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-sm font-body font-semibold px-8 py-6 text-lg hover-elevate active-elevate-2"
              onClick={onPlayPreview}
              data-testid="button-play-preview"
            >
              <Play className="w-5 h-5 mr-2" />
              Play Preview
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-white/70">
            <div className="text-center">
              <div className="text-2xl font-display font-bold text-white">15+</div>
              <div className="text-sm font-body">Remix Tracks</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-display font-bold text-white">320kbps</div>
              <div className="text-sm font-body">High Quality</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-display font-bold text-white">Instant</div>
              <div className="text-sm font-body">Download</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}