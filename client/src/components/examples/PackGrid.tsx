import { useState } from "react";
import PackGrid from "../PackGrid";
import { type MusicPack } from "@shared/schema";
import packCover from "@assets/generated_images/90s_remix_pack_cover_cf424b48.png";

export default function PackGridExample() {
  const [isDarkMode] = useState(true);
  
  // todo: remove mock functionality
  const mockPacks: MusicPack[] = [
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
      featured: true,
      audioPreviewUrl: null,
      downloadUrl: null,
      createdAt: null,
      updatedAt: null
    },
    {
      id: "latin-fusion",
      title: "Latin Fusion",
      artist: "EVOK TECH DJ",
      coverUrl: packCover,
      duration: "38:45",
      tracks: 12,
      genre: "Latin/Fusion",
      size: "95 MB",
      releaseDate: "2025-01-10",
      featured: false,
      audioPreviewUrl: null,
      downloadUrl: null,
      createdAt: null,
      updatedAt: null
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
      releaseDate: "2025-01-08",
      featured: null,
      audioPreviewUrl: null,
      downloadUrl: null,
      createdAt: null,
      updatedAt: null
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
      releaseDate: "2025-01-05",
      featured: null,
      audioPreviewUrl: null,
      downloadUrl: null,
      createdAt: null,
      updatedAt: null
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
      releaseDate: "2025-01-03",
      featured: null,
      audioPreviewUrl: null,
      downloadUrl: null,
      createdAt: null,
      updatedAt: null
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
      releaseDate: "2024-12-28",
      featured: null,
      audioPreviewUrl: null,
      downloadUrl: null,
      createdAt: null,
      updatedAt: null
    }
  ];
  
  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="min-h-screen bg-background">
        <PackGrid 
          packs={mockPacks}
          title="Featured Music Packs"
          subtitle="Discover our premium collection of remixed classics and modern beats"
          onPackPlay={(id) => console.log("Play pack:", id)}
          onPackDownload={(id) => console.log("Download pack:", id)}
          onPackClick={(id) => console.log("View pack details:", id)}
        />
      </div>
    </div>
  );
}