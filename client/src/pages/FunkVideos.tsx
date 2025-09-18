import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Play, ExternalLink } from "lucide-react";
import { useState } from "react";
import thumbnailImage from "@assets/generated_images/music_video_thumbnail_design_4769ff88.png";

function CustomVideoPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  if (isPlaying) {
    return (
      <div className="aspect-video relative">
        <iframe
          src="https://drive.google.com/file/d/1RbaasiiOmz-ICexLt2sLvNd6Q8Icrw9H/preview?t=1m27s&autoplay=1"
          className="w-full h-full rounded-t-lg"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="A Caminho da Treta - Noobreak, Douth! & DFranco"
          width="100%"
          height="100%"
          frameBorder="0"
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div className="aspect-video relative cursor-pointer group" onClick={handlePlay}>
      <img 
        src={thumbnailImage} 
        alt="A Caminho da Treta - Video Thumbnail" 
        className="w-full h-full object-cover rounded-t-lg"
      />
      {/* Play Button Overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-t-lg group-hover:bg-black/30 transition-colors">
        <div className="w-20 h-20 bg-black/70 rounded-full flex items-center justify-center hover-elevate transition-transform group-hover:scale-110">
          <Play className="w-8 h-8 text-white ml-1" fill="white" />
        </div>
      </div>
    </div>
  );
}

export default function FunkVideos() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center py-12 mb-12">
          <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6">
            Funk Videos
          </h1>
          <p className="text-xl text-muted-foreground font-body max-w-2xl mx-auto leading-relaxed">
            Explore our collection of exclusive funk music videos and performances from EVOK TECH DJ
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Video Card 1 */}
          <div className="group hover-elevate rounded-lg overflow-hidden bg-card border border-border">
            <CustomVideoPlayer />
            <div className="p-6">
              <h3 className="font-display font-semibold text-lg mb-2">
                A Caminho da Treta - Noobreak, Douth! & DFranco
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                Exclusive funk performance with high-energy beats and remixes
              </p>
              <Button 
                variant="default" 
                size="sm" 
                className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90" 
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Comprar Pacote Exclusivo
              </Button>
            </div>
          </div>

          {/* Video Card 2 */}
          <div className="group hover-elevate rounded-lg overflow-hidden bg-card border border-border">
            <div className="aspect-video bg-gradient-to-br from-secondary/20 to-primary/20 relative flex items-center justify-center">
              <Button size="icon" variant="outline" className="w-16 h-16 rounded-full">
                <Play className="w-6 h-6" />
              </Button>
            </div>
            <div className="p-6">
              <h3 className="font-display font-semibold text-lg mb-2">
                Behind the Beats
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                Studio session creating the "Latin Fusion" pack
              </p>
              <Button variant="outline" size="sm" className="w-full">
                <ExternalLink className="w-4 h-4 mr-2" />
                Comprar Pacote de Vídeos
              </Button>
            </div>
          </div>

          {/* Video Card 3 */}
          <div className="group hover-elevate rounded-lg overflow-hidden bg-card border border-border">
            <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 relative flex items-center justify-center">
              <Button size="icon" variant="outline" className="w-16 h-16 rounded-full">
                <Play className="w-6 h-6" />
              </Button>
            </div>
            <div className="p-6">
              <h3 className="font-display font-semibold text-lg mb-2">
                Carnival Mix Session
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                Creating the perfect carnival atmosphere with funk beats
              </p>
              <Button variant="outline" size="sm" className="w-full">
                <ExternalLink className="w-4 h-4 mr-2" />
                Comprar Pacote de Vídeos
              </Button>
            </div>
          </div>

          {/* Video Card 4 */}
          <div className="group hover-elevate rounded-lg overflow-hidden bg-card border border-border">
            <div className="aspect-video bg-gradient-to-br from-secondary/20 to-primary/20 relative flex items-center justify-center">
              <Button size="icon" variant="outline" className="w-16 h-16 rounded-full">
                <Play className="w-6 h-6" />
              </Button>
            </div>
            <div className="p-6">
              <h3 className="font-display font-semibold text-lg mb-2">
                Tribal Fusion Tutorial
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                Learn the techniques behind tribal funk fusion
              </p>
              <Button variant="outline" size="sm" className="w-full">
                <ExternalLink className="w-4 h-4 mr-2" />
                Comprar Pacote de Vídeos
              </Button>
            </div>
          </div>

          {/* Video Card 5 */}
          <div className="group hover-elevate rounded-lg overflow-hidden bg-card border border-border">
            <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 relative flex items-center justify-center">
              <Button size="icon" variant="outline" className="w-16 h-16 rounded-full">
                <Play className="w-6 h-6" />
              </Button>
            </div>
            <div className="p-6">
              <h3 className="font-display font-semibold text-lg mb-2">
                Funky House Mix
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                High-energy funky house session from the studio
              </p>
              <Button variant="outline" size="sm" className="w-full">
                <ExternalLink className="w-4 h-4 mr-2" />
                Comprar Pacote de Vídeos
              </Button>
            </div>
          </div>

          {/* Video Card 6 */}
          <div className="group hover-elevate rounded-lg overflow-hidden bg-card border border-border">
            <div className="aspect-video bg-gradient-to-br from-secondary/20 to-primary/20 relative flex items-center justify-center">
              <Button size="icon" variant="outline" className="w-16 h-16 rounded-full">
                <Play className="w-6 h-6" />
              </Button>
            </div>
            <div className="p-6">
              <h3 className="font-display font-semibold text-lg mb-2">
                Equipment Tour
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                Tour of the EVOK TECH DJ studio setup and gear
              </p>
              <Button variant="outline" size="sm" className="w-full">
                <ExternalLink className="w-4 h-4 mr-2" />
                Comprar Pacote de Vídeos
              </Button>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center py-12 mt-12">
          <h2 className="font-display font-bold text-3xl mb-4">
            Quer Mais Conteúdo?
          </h2>
          <p className="text-muted-foreground text-lg mb-6 max-w-xl mx-auto">
            Assista gratuitamente nossos vídeos aqui no site ou adquira o pacote completo com acesso exclusivo
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="outline">
              Continuar Assistindo Grátis
            </Button>
            <Button size="lg" variant="default" className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90">
              <ExternalLink className="w-5 h-5 mr-2" />
              Comprar Pacote Completo
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}