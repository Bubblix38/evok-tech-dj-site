import MusicPackCard, { type MusicPack } from "./MusicPackCard";

interface PackGridProps {
  packs: MusicPack[];
  onPackPlay?: (packId: string) => void;
  onPackDownload?: (packId: string) => void;
  onPackClick?: (packId: string) => void;
  title?: string;
  subtitle?: string;
}

export default function PackGrid({ 
  packs, 
  onPackPlay, 
  onPackDownload, 
  onPackClick, 
  title,
  subtitle 
}: PackGridProps) {
  if (packs.length === 0) {
    return (
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="font-display font-bold text-2xl mb-4 text-foreground">
              {title || "No Packs Available"}
            </h2>
            <p className="text-muted-foreground font-body">
              Check back soon for new music packs!
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && (
              <h2 className="font-display font-bold text-3xl md:text-4xl mb-4 text-foreground">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-muted-foreground font-body text-lg max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {packs.map((pack) => (
            <MusicPackCard
              key={pack.id}
              pack={pack}
              onPlay={onPackPlay}
              onDownload={onPackDownload}
              onClick={onPackClick}
            />
          ))}
        </div>

        {/* Show More Button */}
        {packs.length >= 8 && (
          <div className="text-center mt-12">
            <button 
              className="font-body text-primary hover:text-primary/80 transition-colors underline"
              onClick={() => console.log("Show more packs")}
              data-testid="button-show-more"
            >
              Show More Packs
            </button>
          </div>
        )}
      </div>
    </section>
  );
}