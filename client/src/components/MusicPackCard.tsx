import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, Download, Clock } from "lucide-react";
import { type MusicPack } from "@shared/schema";
import packCover from "@assets/generated_images/90s_remix_pack_cover_cf424b48.png";
import LazyImage from "./LazyImage";

interface MusicPackCardProps {
  pack: MusicPack;
  onPlay?: (packId: string) => void;
  onDownload?: (packId: string) => void;
  onClick?: (packId: string) => void;
}

export default function MusicPackCard({ pack, onPlay, onDownload, onClick }: MusicPackCardProps) {
  return (
    <Card className="group relative overflow-hidden bg-card hover-elevate transition-all duration-300 cursor-pointer">
      {/* Featured Badge */}
      {pack.featured && (
        <div className="absolute top-2 left-2 z-10">
          <span className="px-2 py-1 bg-primary text-primary-foreground text-xs font-display font-semibold rounded">
            Featured
          </span>
        </div>
      )}

      {/* Cover Image */}
      <div 
        className="aspect-square w-full bg-gradient-to-br from-primary/20 to-chart-3/20 relative overflow-hidden"
        onClick={() => onClick?.(pack.id)}
      >
        <LazyImage 
          src={pack.coverUrl || packCover} 
          alt={pack.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          placeholder="Carregando..."
          data-testid={`img-pack-cover-${pack.id}`}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute inset-0 flex items-center justify-center">
            <Button
              variant="secondary"
              size="icon"
              className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm border-white/30"
              onClick={(e) => {
                e.stopPropagation();
                onPlay?.(pack.id);
              }}
              data-testid={`button-play-${pack.id}`}
            >
              <Play className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3" onClick={() => onClick?.(pack.id)}>
        {/* Title and Artist */}
        <div>
          <h3 className="font-display font-bold text-lg text-card-foreground line-clamp-1" data-testid={`text-pack-title-${pack.id}`}>
            {pack.title}
          </h3>
          <p className="text-muted-foreground font-body text-sm" data-testid={`text-pack-artist-${pack.id}`}>
            {pack.artist}
          </p>
        </div>

        {/* Metadata */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground font-body">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{pack.duration}</span>
          </div>
          <span>{pack.tracks} tracks</span>
          <span>{pack.size}</span>
        </div>

        {/* Genre */}
        <div>
          <span className="inline-block px-2 py-1 bg-muted text-muted-foreground text-xs font-body rounded">
            {pack.genre}
          </span>
        </div>

        {/* Action Button */}
        <Button 
          className="w-full font-body font-medium"
          onClick={(e) => {
            e.stopPropagation();
            onDownload?.(pack.id);
          }}
          data-testid={`button-download-${pack.id}`}
        >
          <Download className="w-4 h-4 mr-2" />
          Download
        </Button>
      </div>
    </Card>
  );
}