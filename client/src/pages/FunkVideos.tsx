import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GlobalRadioPlayer from "@/components/GlobalRadioPlayer";
import { Button } from "@/components/ui/button";
import { Play, ExternalLink, Shield, AlertTriangle, Ban } from "lucide-react";
import { useState } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import thumbnailImage from "@assets/generated_images/music_video_thumbnail_design_4769ff88_optimized.jpg";
import VideoProtection from "@/components/VideoProtection";
import BackgroundFX from "@/components/BackgroundFX";

import { isDevelopmentMode } from "../utils/environment";

function CustomVideoPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Detectar ambiente local usando utilitário
  const isLocalhost = isDevelopmentMode();
  
  const handlePlay = () => {
    setIsPlaying(true);
    setIsLoading(true);
    setLoadError(false);
  };
  
  const handleIframeError = (error: any) => {
    console.error('❌ Erro ao carregar iframe do Google Drive:', error);
    console.error('🔗 URL que falhou:', 'https://drive.google.com/file/d/1RbaasiiOmz-ICexLt2sLvNd6Q8Icrw9H/preview?usp=sharing');
    console.error('🔗 Link alternativo:', 'https://drive.google.com/file/d/1RbaasiiOmz-ICexLt2sLvNd6Q8Icrw9H/view?usp=sharing');
    console.error('⚠️ Possíveis causas: permissões, tipo de arquivo, CORS, ou configurações de segurança');
    console.error('🛡️ Sandbox atual:', 'allow-scripts allow-same-origin allow-presentation allow-forms allow-popups allow-top-navigation');
    
    // Tentar detectar o tipo específico de erro
    if (error && error.target) {
      console.error('🔍 Detalhes do erro:', {
        src: error.target.src,
        readyState: error.target.readyState,
        contentDocument: error.target.contentDocument
      });
    }
    
    setLoadError(true);
    setIsLoading(false);
  };

  const handleIframeLoad = () => {
    console.log('✅ Iframe carregado com sucesso');
    console.log('🔗 URL do vídeo:', 'https://drive.google.com/file/d/1RbaasiiOmz-ICexLt2sLvNd6Q8Icrw9H/preview?usp=sharing');
    console.log('🔗 Link de visualização:', 'https://drive.google.com/file/d/1RbaasiiOmz-ICexLt2sLvNd6Q8Icrw9H/view?usp=sharing');
    console.log('🛡️ Sandbox:', 'allow-scripts allow-same-origin allow-presentation allow-forms allow-popups allow-top-navigation');
    setIsLoading(false);
  };

  if (isPlaying) {
    // Se houve erro de carregamento, mostrar placeholder
    if (loadError) {
      return (
        <div className="aspect-video relative bg-gradient-to-br from-purple-900 via-pink-900 to-orange-900 rounded-t-lg" data-testid="demo-player">
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8">
            <Play className="w-20 h-20 mb-4 text-yellow-400 animate-pulse" fill="currentColor" data-testid="button-play" />
            <h3 className="text-2xl font-bold mb-4 text-center">Vídeo Indisponível</h3>
            <p className="text-center text-lg mb-4 max-w-md">
              <strong>"A Caminho da Treta"</strong><br/>
              Noobreak, Douth! & DFranco
            </p>
            <p className="text-sm text-gray-300 text-center max-w-lg">
              Erro ao carregar o vídeo. Tente novamente mais tarde.
              {isLocalhost && <br/>}
              {isLocalhost && "Modo desenvolvimento: Este seria o vídeo completo em produção."}
            </p>
            <div className="mt-6 w-full bg-gray-700 rounded-full h-2">
              <div className="bg-gradient-to-r from-yellow-400 to-pink-500 h-2 rounded-full animate-pulse" style={{width: '35%'}}></div>
            </div>
            <div className="flex items-center gap-4 mt-4 text-sm text-gray-400">
              <span>1:32 / 4:23</span>
              <span>Volume: 85%</span>
            </div>
            <div className="mb-4">
              <p className="text-sm text-yellow-300 mb-2">Tente assistir diretamente no Google Drive:</p>
              <div className="flex flex-col gap-2">
                <a 
                  href="https://drive.google.com/file/d/1RbaasiiOmz-ICexLt2sLvNd6Q8Icrw9H/view"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm transition-colors text-center"
                >
                  🔗 Abrir no Google Drive
                </a>
                <a 
                  href="https://drive.google.com/file/d/1RbaasiiOmz-ICexLt2sLvNd6Q8Icrw9H/preview"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm transition-colors text-center"
                >
                  🎥 Preview Direto
                </a>
                <button
                  onClick={() => window.open('https://drive.google.com/uc?export=download&id=1RbaasiiOmz-ICexLt2sLvNd6Q8Icrw9H', '_blank')}
                  className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded text-sm transition-colors text-center"
                >
                  📥 Download Direto
                </button>
              </div>
            </div>
            <Button 
              onClick={() => {
                setLoadError(false);
                setIsPlaying(false);
              }}
              className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-black"
            >
              Tentar Novamente
            </Button>
          </div>
        </div>
      );
    }

    // Mostrar loading enquanto carrega
    if (isLoading) {
      return (
        <div className="aspect-video relative bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 rounded-t-lg">
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8">
            <LoadingSpinner size="lg" text="Carregando Vídeo..." />
            <h3 className="text-xl font-bold mb-2 text-center">Carregando Vídeo...</h3>
            <p className="text-center text-sm text-gray-300">
              "A Caminho da Treta" - Noobreak, Douth! & DFranco
            </p>
          </div>
        </div>
      );
    }

    // Tentar carregar o iframe real do Google Drive
    return (
      <div className="aspect-video relative">
        <iframe
          src="https://drive.google.com/file/d/1RbaasiiOmz-ICexLt2sLvNd6Q8Icrw9H/preview"
          className="w-full h-full rounded-t-lg"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
          allowFullScreen
          title="A Caminho da Treta - Noobreak, Douth! & DFranco"
          width="100%"
          height="100%"
          frameBorder="0"
          loading="eager"
          referrerPolicy="strict-origin-when-cross-origin"
          sandbox="allow-scripts allow-same-origin allow-presentation allow-forms allow-popups allow-top-navigation allow-downloads allow-modals"
          onError={handleIframeError}
          onLoad={handleIframeLoad}
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
  const [isBlocked, setIsBlocked] = useState(false);
  const [adBlockDetected, setAdBlockDetected] = useState(false);
  
  // Detectar ambiente local usando utilitário
  const isLocalhost = isDevelopmentMode();
  
  const handleViolationDetected = () => {
    // Não bloquear em localhost para desenvolvimento
    // Nao bloquear em localhost para desenvolvimento
    if (!isLocalhost) {
      setIsBlocked(true);
    }
  };

  const handleAdBlockDetected = () => {
    // Nao detectar ad-block em localhost
    if (!isLocalhost) {
      setAdBlockDetected(true);
    }
  };

  // Exibir tela de bloqueio de ad blocker (apenas em produção)
  if (adBlockDetected && !isLocalhost) {
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

  if (isBlocked && !isLocalhost) {
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
      {/* Video Protection - apenas em produção */}
      {!isLocalhost && (
        <VideoProtection 
          onViolationDetected={handleViolationDetected}
          onAdBlockDetected={handleAdBlockDetected} 
        />
      )}
      
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center py-12 mb-12">
          <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6">
            Vídeos
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
      
      <GlobalRadioPlayer className="fixed" />
    </div>
  );
}