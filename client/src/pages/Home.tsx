import { useState, Suspense } from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import PackGrid from "../components/PackGrid";
import FeaturedPacksCarousel from "../components/FeaturedPacksCarousel";
import BestSellersSection from "../components/BestSellersSection";
import AudioPlayer from "../components/AudioPlayer";
import WhatsAppButton from "../components/WhatsAppButton";
import Footer from "../components/Footer";
import { LazyBackgroundFX } from "../utils/lazyLoad";
import GlobalRadioPlayer from "../components/GlobalRadioPlayer";
import LoadingSpinner from "../components/LoadingSpinner";
import { FeaturedCarouselSkeleton, PackGridSkeleton } from "../components/SkeletonLoader";
import { useMusicPacks, useFeaturedPacks, downloadMusicPack } from "../hooks/useMusicPacks";
import { type MusicPack } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [currentTrack, setCurrentTrack] = useState<any>(null);
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);
  const { toast } = useToast();

  // Fetch data from backend
  const { data: allPacks = [], isLoading: isLoadingAll, error: allPacksError } = useMusicPacks();
  const { data: featuredPacks = [], isLoading: isLoadingFeatured, error: featuredPacksError } = useFeaturedPacks();

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

  return (
    <div className="min-h-screen bg-background relative">
        {/* Background particles and scanlines effect */}
        <Suspense fallback={null}>
          <LazyBackgroundFX scope="home" density="low" enabled={true} />
        </Suspense>
        <Header />

        <main>
          <HeroSection 
            onPlayPreview={handleHeroPreview}
            onDownload={handleHeroDownload}
          />

          {/* Live Radio Section - Removed since it's now in header */}
          
          {featuredPacks.length > 0 ? (
            <FeaturedPacksCarousel 
              packs={featuredPacks} 
              onPackPlay={handlePackPlay}
              onPackDownload={handlePackDownload}
            />
          ) : isLoadingFeatured ? (
            <FeaturedCarouselSkeleton />
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground font-body">Nenhum pack em destaque disponível no momento.</p>
            </div>
          )}

          {/* Best Sellers Section */}
          <BestSellersSection 
            packs={featuredPacks}
            onPackPlay={handlePackPlay}
            onPackDownload={handlePackDownload}
            onPackClick={handlePackClick}
          />

          {/* Radio Online Section - Removed since it's now in header */}

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

        <GlobalRadioPlayer className="fixed" />

        <WhatsAppButton 
          phoneNumber="59895905365"
          message="Hi! I'm interested in your music packs. Can you provide more information?"
        />
    </div>
  );
}