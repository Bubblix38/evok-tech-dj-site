import { useState } from "react";
import HeroSection from "../HeroSection";

export default function HeroSectionExample() {
  const [isDarkMode] = useState(true);
  
  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="min-h-screen bg-background">
        <HeroSection 
          onPlayPreview={() => console.log("Play preview triggered")}
          onDownload={() => console.log("Download pack triggered")}
        />
      </div>
    </div>
  );
}