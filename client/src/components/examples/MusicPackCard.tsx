import { useState } from "react";
import MusicPackCard, { type MusicPack } from "../MusicPackCard";
import packCover from "@assets/generated_images/90s_remix_pack_cover_cf424b48.png";

export default function MusicPackCardExample() {
  const [isDarkMode] = useState(true);
  
  // todo: remove mock functionality
  const mockPack: MusicPack = {
    id: "90s-remix-pack",
    title: "90s REMIX PACK",
    artist: "LMB Premium",
    coverUrl: packCover,
    duration: "45:30",
    tracks: 15,
    genre: "Remix/House",
    size: "120 MB",
    releaseDate: "2025-01-15",
    featured: true
  };
  
  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-sm mx-auto">
          <MusicPackCard 
            pack={mockPack}
            onPlay={(id) => console.log("Play pack:", id)}
            onDownload={(id) => console.log("Download pack:", id)}
            onClick={(id) => console.log("View pack details:", id)}
          />
        </div>
      </div>
    </div>
  );
}