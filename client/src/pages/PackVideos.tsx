import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Play, ExternalLink, Shield, AlertTriangle, Ban, Volume2, Settings, Maximize, Download, Share2, Heart, Star } from "lucide-react";
import { useState } from "react";
import thumbnailImage from "@assets/generated_images/music_video_thumbnail_design_4769ff88.png";
import VideoProtection from "@/components/VideoProtection";
import BackgroundFX from "@/components/BackgroundFX";
import LazyImage from "@/components/LazyImage";

function CustomVideoPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [useAlternative, setUseAlternative] = useState(false);
  const [loadingState, setLoadingState] = useState<'idle' | 'loading' | 'loaded' | 'error'>('idle');
  const [isHovered, setIsHovered] = useState(false);

  // Extrair ID do vídeo do link fornecido
  const videoId = "1RbaasiiOmz-ICexLt2sLvNd6Q8Icrw9H";

  const handlePlay = () => {
    setIsPlaying(true);
    setLoadingState('loading');
    console.log('Iniciando reprodução do vídeo:', videoId);
  };

  const handleError = () => {
    setHasError(true);
    setLoadingState('error');
    console.error('Erro ao carregar o vídeo:', videoId);
  };

  const handleLoad = () => {
    setLoadingState('loaded');
    console.log('Vídeo carregado com sucesso:', videoId);
  };

  const tryAlternative = () => {
    setUseAlternative(true);
    setHasError(false);
    setIsPlaying(true);
    setLoadingState('loading');
    console.log('Tentando método alternativo para:', videoId);
  };

  // Diferentes URLs para tentar
  const getVideoUrls = () => {
    const baseId = videoId;
    return {
      preview: `https://drive.google.com/file/d/${baseId}/preview`,
      embed: `https://drive.google.com/file/d/${baseId}/preview?usp=embed_facebook`,
      direct: `https://drive.google.com/uc?export=view&id=${baseId}`,
      stream: `https://drive.google.com/file/d/${baseId}/view?usp=sharing`
    };
  };

  if (hasError) {
    return (
      <div className="aspect-video relative bg-muted flex items-center justify-center rounded-t-lg">
        <div className="text-center p-6">
          <AlertTriangle className="w-12 h-12 mx-auto text-yellow-500 mb-4" />
          <p className="text-muted-foreground text-sm mb-2">
            Erro ao carregar o vídeo do Google Drive.
          </p>
          <p className="text-muted-foreground text-xs mb-4">
            Tente uma das opções abaixo
          </p>
          <div className="flex gap-2 justify-center flex-wrap">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                setHasError(false);
                setIsPlaying(false);
                setLoadingState('idle');
                console.log('Tentando novamente...');
              }}
            >
              Tentar Novamente
            </Button>
            <Button 
              variant="secondary" 
              size="sm"
              onClick={() => {
                console.log('Tentando fallback HTML5...');
                setUseAlternative(false);
                setHasError(false);
                setIsPlaying(false);
                setLoadingState('idle');
                // Tentar com elemento video HTML5
                setTimeout(() => {
                  const urls = getVideoUrls();
                  const videoElement = document.createElement('video');
                  videoElement.src = urls.direct;
                  videoElement.controls = true;
                  videoElement.className = 'w-full h-full rounded-t-lg object-cover';
                  videoElement.onloadstart = () => console.log('Video HTML5 iniciando...');
                  videoElement.oncanplay = () => console.log('Video HTML5 pode reproduzir');
                  videoElement.onerror = (e) => console.error('Erro no video HTML5:', e);
                  
                  const container = document.querySelector('.aspect-video');
                  if (container) {
                    container.innerHTML = '';
                    container.appendChild(videoElement);
                  }
                }, 100);
              }}
            >
              Tentar HTML5
            </Button>
            {/* Botão "Abrir no Drive" removido */}
          </div>
        </div>
      </div>
    );
  }

  if (isPlaying) {
    const urls = getVideoUrls();
    
    // URLs otimizadas para reprodução inline no Google Drive
    const videoUrl = useAlternative ? urls.direct : urls.preview;
    
    console.log('Tentando carregar vídeo com URL:', videoUrl);

    return (
      <div className="aspect-video relative">
        {loadingState === 'loading' && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
            <div className="text-white text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
              <p className="text-sm">Carregando vídeo...</p>
            </div>
          </div>
        )}
        
        <iframe
          src={videoUrl}
          className="w-full h-full rounded-t-lg"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
          allowFullScreen
          title="A Caminho da Treta - Noobreak, Douth! & DFranco"
          width="100%"
          height="100%"
          frameBorder="0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          onError={(e) => {
            console.error('Erro no iframe:', e);
            handleError();
          }}
          onLoad={() => {
            console.log('Iframe carregado:', videoUrl);
            handleLoad();
            // Verificar se o iframe carregou corretamente após um tempo
            setTimeout(() => {
              const iframe = document.querySelector('iframe[title="A Caminho da Treta - Noobreak, Douth! & DFranco"]');
              if (iframe) {
                console.log('Iframe principal carregado com sucesso');
              }
            }, 2000);
          }}
        />
      </div>
    );
  }

  return (
    <div 
      className="aspect-video relative cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handlePlay}
    >
      {/* Background Image */}
      <LazyImage 
        src={thumbnailImage} 
        alt="A Caminho da Treta - Video Thumbnail" 
        className="w-full h-full object-cover rounded-t-lg transition-transform duration-500 group-hover:scale-110"
        placeholder="Carregando thumbnail..."
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 rounded-t-lg" />
      
      {/* Professional Video Controls Overlay */}
      <div className={`absolute inset-0 bg-black/30 rounded-t-lg transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        {/* Top Controls */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
          <div className="flex gap-2">
            <Button size="sm" variant="secondary" className="bg-black/50 hover:bg-black/70 text-white border-0 backdrop-blur-sm">
              <Volume2 className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="secondary" className="bg-black/50 hover:bg-black/70 text-white border-0 backdrop-blur-sm">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="secondary" className="bg-black/50 hover:bg-black/70 text-white border-0 backdrop-blur-sm">
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Center Play Button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-2xl hover:shadow-primary/25 transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-white/20">
              <Play className="w-8 h-8 text-white ml-1" fill="white" />
            </div>
            {/* Pulse Animation */}
            <div className="absolute inset-0 w-20 h-20 bg-primary/30 rounded-full animate-ping"></div>
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
          <div className="flex gap-2">
            <Button size="sm" variant="secondary" className="bg-black/50 hover:bg-black/70 text-white border-0 backdrop-blur-sm">
              <Heart className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="secondary" className="bg-black/50 hover:bg-black/70 text-white border-0 backdrop-blur-sm">
              <Download className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-white text-sm font-medium">4.9</span>
          </div>
        </div>
      </div>

      {/* Quality Badge */}
      <div className="absolute top-4 left-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
        4K HD
      </div>

      {/* Duration Badge */}
      <div className="absolute bottom-4 right-4 bg-black/70 text-white text-xs font-medium px-2 py-1 rounded backdrop-blur-sm">
        15:42
      </div>
    </div>
  );
}

export default function PackVideos() {
  const [isBlocked, setIsBlocked] = useState(false);
  const [adBlockDetected, setAdBlockDetected] = useState(false);

  const handleViolationDetected = () => {
    setIsBlocked(true);
  };

  const handleAdBlockDetected = () => {
    setAdBlockDetected(true);
  };

  // Exibir tela de bloqueio de ad blocker
  if (adBlockDetected) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-20">
            <div className="mb-8">
              <Ban className="w-24 h-24 mx-auto text-orange-500 mb-6" />
              <AlertTriangle className="w-16 h-16 mx-auto text-yellow-500 mb-6" />
            </div>
            <h1 className="font-display font-bold text-4xl md:text-5xl mb-6 text-orange-500">
              Ad Blocker Detectado
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Para manter nosso conteúdo gratuito, precisamos exibir anúncios de nossos parceiros.
              Por favor, desabilite seu bloqueador de anúncios para continuar.
            </p>
            <div className="bg-card border border-border rounded-lg p-6 mb-8 max-w-xl mx-auto">
              <h3 className="font-semibold text-lg mb-4">Como desabilitar:</h3>
              <ul className="text-left space-y-2 text-muted-foreground">
                <li>• Clique no ícone do ad blocker no navegador</li>
                <li>• Selecione "Pausar no site" ou "Desabilitar"</li>
                <li>• Recarregue a página</li>
                <li>• Apoie criadores de conteúdo!</li>
              </ul>
            </div>
            <div className="mb-6 p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg">
              <p className="text-sm text-muted-foreground">
                💝 <strong>Obrigado!</strong> Sua visualização de anúncios nos ajuda a trazer mais conteúdo de qualidade.
              </p>
            </div>
            <Button 
              size="lg" 
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white"
            >
              Recarregar Página
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (isBlocked) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-20">
            <div className="mb-8">
              <Shield className="w-24 h-24 mx-auto text-destructive mb-6" />
              <AlertTriangle className="w-16 h-16 mx-auto text-yellow-500 mb-6" />
            </div>
            <h1 className="font-display font-bold text-4xl md:text-5xl mb-6 text-destructive">
              Acesso Bloqueado
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Detectamos uso de gerenciadores de download (como IDM) ou ferramentas não autorizadas.
              Para proteger nosso conteúdo, o acesso foi temporariamente bloqueado.
            </p>
            <div className="bg-card border border-border rounded-lg p-6 mb-8 max-w-xl mx-auto">
              <h3 className="font-semibold text-lg mb-4">Para continuar assistindo:</h3>
              <ul className="text-left space-y-2 text-muted-foreground">
                <li>• Desabilite extensões de download</li>
                <li>• Feche gerenciadores como IDM</li>
                <li>• Recarregue a página</li>
              </ul>
            </div>
            <Button 
              size="lg" 
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
            >
              Recarregar Página
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      {/* Background particles and scanlines effect */}
      <BackgroundFX scope="funk" density="low" enabled={true} />
      <VideoProtection 
        onViolationDetected={handleViolationDetected}
        onAdBlockDetected={handleAdBlockDetected}
      />
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center py-12 mb-12">
          <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6">
            Pack Vídeos
          </h1>
          <p className="text-xl text-muted-foreground font-body max-w-2xl mx-auto leading-relaxed">
            Explore our collection of exclusive funk music videos and performances from EVOK TECH DJ
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Video Card 1 */}
          <div className="group relative rounded-xl overflow-hidden bg-gradient-to-br from-card to-card/80 border border-border/50 shadow-lg hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:scale-105 hover:-translate-y-2">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <CustomVideoPlayer />
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <span className="text-xs text-primary font-semibold bg-primary/10 px-2 py-1 rounded-full">NOVO</span>
                </div>
                <h3 className="font-display font-bold text-lg mb-3 group-hover:text-primary transition-colors duration-300">
                  PACOTE DE VIDEO REMIX - EletroFunk - Sertanejo, Funk e Piseiro
                </h3>
                <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                  Pacote completo com os melhores remixes de EletroFunk, Sertanejo, Funk e Piseiro
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-2xl font-black text-primary group-hover:scale-110 transition-transform duration-300">R$ 35,99</span>
                    <span className="text-xs text-muted-foreground">Preço promocional</span>
                  </div>
                  <Button className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg hover:shadow-xl hover:shadow-primary/25 transition-all duration-300 hover:scale-105 group-hover:animate-pulse">
                    <span className="font-bold">Comprar</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Video Card 2 */}
          <div className="group relative rounded-xl overflow-hidden bg-gradient-to-br from-card to-card/80 border border-border/50 shadow-lg hover:shadow-2xl hover:shadow-secondary/10 transition-all duration-500 hover:scale-105 hover:-translate-y-2">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="aspect-video bg-gradient-to-br from-secondary/20 to-primary/20 relative flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <Button size="icon" variant="outline" className="w-16 h-16 rounded-full border-2 hover:border-secondary hover:bg-secondary/10 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg relative z-10">
                  <Play className="w-6 h-6 group-hover:text-secondary transition-colors duration-300" />
                </Button>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
                  <span className="text-xs text-secondary font-semibold bg-secondary/10 px-2 py-1 rounded-full">POPULAR</span>
                </div>
                <h3 className="font-display font-bold text-lg mb-3 group-hover:text-secondary transition-colors duration-300">
                  Behind the Beats
                </h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  Studio session creating the "Latin Fusion" pack
                </p>
              </div>
            </div>
          </div>

          {/* Video Card 3 */}
          <div className="group relative rounded-xl overflow-hidden bg-gradient-to-br from-card to-card/80 border border-border/50 shadow-lg hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:scale-105 hover:-translate-y-2">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-chart-2/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 relative flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-chart-2/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <Button size="icon" variant="outline" className="w-16 h-16 rounded-full border-2 hover:border-primary hover:bg-primary/10 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg relative z-10">
                  <Play className="w-6 h-6 group-hover:text-primary transition-colors duration-300" />
                </Button>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-2 h-2 bg-chart-2 rounded-full animate-pulse"></div>
                  <span className="text-xs text-chart-2 font-semibold bg-chart-2/10 px-2 py-1 rounded-full">EXCLUSIVO</span>
                </div>
                <h3 className="font-display font-bold text-lg mb-3 group-hover:text-primary transition-colors duration-300">
                  Carnival Mix Session
                </h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  Creating the perfect carnival atmosphere with funk beats
                </p>
              </div>
            </div>
          </div>

          {/* Video Card 4 */}
          <div className="group relative rounded-xl overflow-hidden bg-gradient-to-br from-card to-card/80 border border-border/50 shadow-lg hover:shadow-2xl hover:shadow-chart-3/10 transition-all duration-500 hover:scale-105 hover:-translate-y-2">
            <div className="absolute inset-0 bg-gradient-to-br from-chart-3/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="aspect-video bg-gradient-to-br from-secondary/20 to-primary/20 relative flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-chart-3/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <Button size="icon" variant="outline" className="w-16 h-16 rounded-full border-2 hover:border-chart-3 hover:bg-chart-3/10 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg relative z-10">
                  <Play className="w-6 h-6 group-hover:text-chart-3 transition-colors duration-300" />
                </Button>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-2 h-2 bg-chart-3 rounded-full animate-pulse"></div>
                  <span className="text-xs text-chart-3 font-semibold bg-chart-3/10 px-2 py-1 rounded-full">TUTORIAL</span>
                </div>
                <h3 className="font-display font-bold text-lg mb-3 group-hover:text-chart-3 transition-colors duration-300">
                  Tribal Fusion Tutorial
                </h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  Learn the techniques behind tribal funk fusion
                </p>
              </div>
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

            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center py-12 mt-12">
          <h2 className="font-display font-bold text-3xl mb-4">
            Mais Vídeos em Breve
          </h2>
          <p className="text-muted-foreground text-lg mb-6 max-w-xl mx-auto">
            Estamos preparando mais conteúdo exclusivo de funk para você. Volte em breve para conferir!
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}