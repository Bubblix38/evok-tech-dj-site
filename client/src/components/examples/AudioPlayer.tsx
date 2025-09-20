import { useState } from "react";
import AudioPlayer from "../AudioPlayer";

export default function AudioPlayerExample() {
  const [isDarkMode] = useState(false); // Sempre modo light
  const [isPlayerVisible, setIsPlayerVisible] = useState(true);
  
  // todo: remove mock functionality
  const mockTrack = {
    id: "sample-track",
    title: "Evok Tech DJ Anthem",
    artist: "EVOK TECH DJ",
    duration: 240, // 4 minutes in seconds
    url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav" // placeholder
  };
  
  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="min-h-screen bg-background">
        <div className="p-8">
          <div className="text-center">
            <h2 className="font-display font-bold text-2xl mb-4 text-foreground">Audio Player Component</h2>
            <p className="text-muted-foreground font-body mb-6">
              Player controls appear at the bottom of the screen
            </p>
            <button 
              onClick={() => setIsPlayerVisible(!isPlayerVisible)}
              className="text-primary hover:text-primary/80 font-body"
            >
              {isPlayerVisible ? "Hide" : "Show"} Player
            </button>
          </div>
        </div>
        
        <AudioPlayer
          currentTrack={mockTrack}
          isVisible={isPlayerVisible}
          onNext={() => console.log("Next track")}
          onPrevious={() => console.log("Previous track")}
          onClose={() => setIsPlayerVisible(false)}
        />
      </div>
    </div>
  );
}