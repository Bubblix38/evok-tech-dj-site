import { useState } from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import PackGrid from "../components/PackGrid";
import AudioPlayer from "../components/AudioPlayer";
import WhatsAppButton from "../components/WhatsAppButton";
import Footer from "../components/Footer";
import { type MusicPack } from "../components/MusicPackCard";
import packCover from "@assets/generated_images/90s_remix_pack_cover_cf424b48.png";

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currentTrack, setCurrentTrack] = useState<any>(null);
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);

  // todo: remove mock functionality
  const featuredPacks: MusicPack[] = [
    {
      id: "90s-remix-pack",
      title: "Evok Tech DJ",
      artist: "EVOK TECH DJ",
      coverUrl: packCover,
      duration: "45:30",
      tracks: 15,
      genre: "Remix/House",
      size: "120 MB",
      releaseDate: "2025-01-15",
      featured: true
    },
    {
      id: "latin-fusion",
      title: "Latin Fusion *UPDATE",
      artist: "EVOK TECH DJ",
      coverUrl: packCover,
      duration: "38:45",
      tracks: 12,
      genre: "Latin/Fusion",
      size: "95 MB",
      releaseDate: "2025-01-10",
      featured: true
    },
    {
      id: "tribal-fusion",
      title: "Tribal Fusion Vol. 1",
      artist: "EVOK TECH DJ",
      coverUrl: packCover,
      duration: "42:15",
      tracks: 14,
      genre: "Tribal/House",
      size: "110 MB",
      releaseDate: "2025-01-08"
    },
    {
      id: "funky-house",
      title: "Funky House Essentials 2025",
      artist: "EVOK TECH DJ",
      coverUrl: packCover,
      duration: "52:30",
      tracks: 18,
      genre: "Funky House",
      size: "140 MB",
      releaseDate: "2025-01-05"
    },
    {
      id: "dance-pop",
      title: "Dance-Pop 2025",
      artist: "EVOK TECH DJ",
      coverUrl: packCover,
      duration: "35:20",
      tracks: 11,
      genre: "Dance-Pop",
      size: "85 MB",
      releaseDate: "2025-01-03"
    },
    {
      id: "80s-remix",
      title: "80s REMIX Pack (2nd Edition)",
      artist: "EVOK TECH DJ",
      coverUrl: packCover,
      duration: "48:10",
      tracks: 16,
      genre: "Remix/Retro",
      size: "125 MB",
      releaseDate: "2024-12-28"
    },
    {
      id: "carnival-2025",
      title: "Carnival 2025 - Carnaval Pack",
      artist: "EVOK TECH DJ",
      coverUrl: packCover,
      duration: "43:20",
      tracks: 13,
      genre: "Carnival/Latin",
      size: "115 MB",
      releaseDate: "2024-12-20"
    },
    {
      id: "countdown-2025",
      title: "Countdown 2025",
      artist: "EVOK TECH DJ",
      coverUrl: packCover,
      duration: "39:45",
      tracks: 12,
      genre: "Party/Dance",
      size: "105 MB",
      releaseDate: "2024-12-15"
    }
  ];

  const recentPacks = featuredPacks.slice(2);

  const handlePackPlay = (packId: string) => {
    const pack = featuredPacks.find(p => p.id === packId);
    if (pack) {
      // todo: remove mock functionality
      const mockTrack = {
        id: `${packId}-sample`,
        title: `${pack.title} - Preview`,
        artist: pack.artist,
        duration: 240, // 4 minutes
        url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
      };
      setCurrentTrack(mockTrack);
      setIsPlayerVisible(true);
      console.log("Playing pack preview:", packId);
    }
  };

  const handlePackDownload = (packId: string) => {
    console.log("Downloading pack:", packId);
    // In a real app, this would trigger the download
    alert(`Download started for pack: ${packId}`);
  };

  const handlePackClick = (packId: string) => {
    console.log("Navigate to pack details:", packId);
    // In a real app, this would navigate to the pack detail page
  };

  const handleHeroDownload = () => {
    handlePackDownload("90s-remix-pack");
  };

  const handleHeroPreview = () => {
    handlePackPlay("90s-remix-pack");
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

          <PackGrid 
            packs={featuredPacks.slice(0, 4)}
            title="Featured Packs"
            subtitle="Our most popular remix collections and latest releases"
            onPackPlay={handlePackPlay}
            onPackDownload={handlePackDownload}
            onPackClick={handlePackClick}
          />

          <PackGrid 
            packs={recentPacks}
            title="Recent Releases"
            subtitle="Fresh beats and classic remixes added to our collection"
            onPackPlay={handlePackPlay}
            onPackDownload={handlePackDownload}
            onPackClick={handlePackClick}
          />

          {/* Coming Soon Section */}
          <section className="py-12 bg-muted/30">
            <div className="container mx-auto px-4 text-center">
              <h2 className="font-display font-bold text-2xl md:text-3xl mb-4 text-foreground">
                Coming Packs / Próximos Packs
              </h2>
              <p className="text-muted-foreground font-body text-lg">
                Wedding Pack Series | 90s REMIX Pack Vol. 2 | Year by Year (Best of) Series
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