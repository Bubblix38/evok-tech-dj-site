import { useState } from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import PackGrid from "../components/PackGrid";
import AudioPlayer from "../components/AudioPlayer";
import WhatsAppButton from "../components/WhatsAppButton";
import Footer from "../components/Footer";
import { useMusicPacks, useFeaturedPacks, downloadMusicPack } from "../hooks/useMusicPacks";
import { type MusicPack } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currentTrack, setCurrentTrack] = useState<any>(null);
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);
  const { toast } = useToast();

  // Fetch data from backend
  const { data: allPacks = [], isLoading: isLoadingAll, error: allPacksError } = useMusicPacks();
  const { data: featuredPacks = [], isLoading: isLoadingFeatured, error: featuredPacksError } = useFeaturedPacks();
  
  // Divide Featured packs into two sections of 4 each
  const topFeaturedPacks = featuredPacks.slice(0, 4);
  const bottomFeaturedPacks = featuredPacks.slice(4, 8);

  const handlePackPlay = (packId: string) => {
    const pack = allPacks.find(p => p.id === packId);
    if (pack) {
      const track = {
        id: `${packId}-sample`,
        title: `${pack.title} - Preview`,
        artist: pack.artist,
        duration: 240, // 4 minutes
        url: pack.audioPreviewUrl || "/assets/audio/sample-preview.mp3"
      };
      setCurrentTrack(track);
      setIsPlayerVisible(true);
      console.log("Playing pack preview:", packId);
    }
  };

  const handlePackDownload = async (packId: string) => {
    try {
      console.log("Downloading pack:", packId);
      await downloadMusicPack(packId);
      toast({
        title: "Download Started",
        description: "Your pack download has been initiated.",
      });
    } catch (error) {
      console.error('Download failed:', error);
      toast({
        title: "Download Failed",
        description: "There was an error downloading the pack. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handlePackClick = (packId: string) => {
    console.log("Navigate to pack details:", packId);
    // In a real app, this would navigate to the pack detail page
  };

  const handleHeroDownload = () => {
    const mainPack = featuredPacks[0];
    if (mainPack) {
      handlePackDownload(mainPack.id);
    }
  };

  const handleHeroPreview = () => {
    const mainPack = featuredPacks[0];
    if (mainPack) {
      handlePackPlay(mainPack.id);
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    console.log("Theme toggled:", !isDarkMode ? "dark" : "light");
  };

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="min-h-screen bg-background">
        <Header 
          isDarkMode={isDarkMode}
          onThemeToggle={toggleTheme}
        />

        <main>
          <HeroSection 
            onPlayPreview={handleHeroPreview}
            onDownload={handleHeroDownload}
          />

          {featuredPacksError ? (
            <div className="py-12 text-center">
              <div className="text-muted-foreground font-body">Failed to load featured packs. Please refresh the page.</div>
            </div>
          ) : isLoadingFeatured ? (
            <div className="py-12 text-center">
              <div className="text-muted-foreground font-body">Loading featured packs...</div>
            </div>
          ) : (
            <PackGrid 
              packs={topFeaturedPacks}
              title="Featured Packs"
              subtitle="Our most popular remix collections and latest releases"
              onPackPlay={handlePackPlay}
              onPackDownload={handlePackDownload}
              onPackClick={handlePackClick}
            />
          )}

          {featuredPacksError ? (
            <div className="py-12 text-center">
              <div className="text-muted-foreground font-body">Failed to load featured packs. Please refresh the page.</div>
            </div>
          ) : isLoadingFeatured ? (
            <div className="py-12 text-center">
              <div className="text-muted-foreground font-body">Loading more featured packs...</div>
            </div>
          ) : bottomFeaturedPacks.length > 0 && (
            <PackGrid 
              packs={bottomFeaturedPacks}
              title="More Featured Packs"
              subtitle="Additional premium collections and exclusive releases"
              onPackPlay={handlePackPlay}
              onPackDownload={handlePackDownload}
              onPackClick={handlePackClick}
            />
          )}

          {/* Coming Soon Section */}
          <section className="py-12 bg-muted/30">
            <div className="container mx-auto px-4 text-center">
              <h2 className="font-display font-bold text-2xl md:text-3xl mb-4 text-foreground">
                Coming Packs / Próximos Packs
              </h2>
              <p className="text-muted-foreground font-body text-lg">
                Wedding Pack Series | Evok Tech DJ Vol. 2 | Year by Year (Best of) Series
              </p>
            </div>
          </section>
        </main>

        <Footer />

        <AudioPlayer
          currentTrack={currentTrack}
          isVisible={isPlayerVisible}
          onNext={() => console.log("Next track")}
          onPrevious={() => console.log("Previous track")}
          onClose={() => setIsPlayerVisible(false)}
        />

        <WhatsAppButton 
          phoneNumber="59895905365"
          message="Hi! I'm interested in your music packs. Can you provide more information?"
        />
      </div>
    </div>
  );
}