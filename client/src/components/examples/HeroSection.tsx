import HeroSection from "../HeroSection";

export default function HeroSectionExample() {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection 
        onPlayPreview={() => console.log("Play preview triggered")}
        onDownload={() => console.log("Download pack triggered")}
      />
    </div>
  );
}