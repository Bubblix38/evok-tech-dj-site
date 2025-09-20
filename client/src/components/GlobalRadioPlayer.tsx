import { Play, Pause, Volume1, Volume2, VolumeX, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRadio } from '@/contexts/RadioContext';

interface GlobalRadioPlayerProps {
  className?: string;
}

export default function GlobalRadioPlayer({ className = '' }: GlobalRadioPlayerProps) {
  const {
    isPlaying,
    volume,
    isMuted,
    isLoading,
    error,
    togglePlay,
    setVolume,
    toggleMute,
    nowPlaying,
    currentTrackName,
    isDownloading,
    downloadProgress,
    startDownload,
    stopDownload
  } = useRadio();

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  return (
    <div className={`${className.includes('fixed') ? 'fixed bottom-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-md border-t border-gray-700 shadow-2xl' : className || 'bg-gray-900/95 backdrop-blur-md border border-gray-700 rounded-lg shadow-2xl p-4'}`} data-testid="radio-player">
      {/* Player horizontal na parte inferior como no site original */}
      <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
        {/* Lado esquerdo: Botão Play + Info da música */}
        <div className="flex items-center gap-4 flex-1 min-w-0">
          {/* Botão de Play/Pause */}
          <Button
            onClick={togglePlay}
            disabled={isLoading}
            className="w-12 h-12 rounded-full bg-white hover:bg-gray-100 text-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center p-0"
            data-testid="button-radio-play"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
            ) : isPlaying ? (
              <Pause className="w-5 h-5" />
            ) : (
              <Play className="w-5 h-5 ml-0.5" />
            )}
          </Button>

          {/* Informações da música */}
          <div className="flex flex-col min-w-0 flex-1">
            <div className="flex items-center gap-3">
              <span className="font-semibold text-white">EVOK.FM</span>
              {/* Status indicator ao lado do nome */}
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-green-400 animate-pulse' : 'bg-gray-500'}`} />
                <span className="text-xs text-gray-400 font-medium">
                  {isLoading ? 'Conectando...' : isPlaying ? 'LIVE' : 'Offline'}
                </span>
              </div>
            </div>
            {/* Nome da música atual */}
            {nowPlaying && isPlaying && (
              <div className="text-sm text-gray-300 truncate mt-1">
                <span className="font-medium">{nowPlaying.artist}</span>
                {nowPlaying.title && (
                  <>
                    <span className="mx-2">-</span>
                    <span>{nowPlaying.title}</span>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Centro: Barra de progresso (simulada) */}
        <div className="hidden md:flex items-center gap-3 flex-1 max-w-md mx-8">
          <div className="w-full bg-gray-700 rounded-full h-1">
            <div 
              className="bg-orange-500 h-1 rounded-full transition-all duration-1000"
              style={{ width: isPlaying ? '45%' : '0%' }}
            />
          </div>
        </div>

        {/* Lado direito: Controles */}
        <div className="flex items-center gap-3">
          {/* Controle de volume com slider */}
          <div className="hidden md:flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMute}
              className="text-gray-400 hover:text-white hover:bg-gray-800 rounded-full w-8 h-8"
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-3 h-3" />
              ) : volume < 0.5 ? (
                <Volume1 className="w-3 h-3" />
              ) : (
                <Volume2 className="w-3 h-3" />
              )}
            </Button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-20 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #f97316 0%, #f97316 ${(isMuted ? 0 : volume) * 100}%, #374151 ${(isMuted ? 0 : volume) * 100}%, #374151 100%)`
              }}
            />
          </div>

          {/* Controle de volume mobile (apenas botão) */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMute}
            className="md:hidden text-gray-400 hover:text-white hover:bg-gray-800 rounded-full w-10 h-10"
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="w-4 h-4" />
            ) : volume < 0.5 ? (
              <Volume1 className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </Button>

          {/* Controles de download */}
          <div className="flex items-center gap-2 border-l border-gray-600 pl-3">
            {/* Botão de download da música atual */}
            {!isDownloading ? (
              <Button
                variant="ghost"
                size="icon"
                onClick={startDownload}
                disabled={!isPlaying}
                className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/20 rounded-full w-10 h-10 disabled:opacity-50"
                title={`Baixar: ${nowPlaying ? `${nowPlaying.artist} - ${nowPlaying.title}` : 'música atual'}`}
              >
                <Download className="w-4 h-4" />
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={stopDownload}
                  className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/20 rounded-full w-10 h-10 animate-pulse"
                  title="Parar download"
                >
                  <Download className="w-4 h-4" />
                </Button>
                <span className="text-blue-400 text-xs font-mono">
                  {Math.floor(downloadProgress)}s
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mensagem de erro se houver */}
      {error && (
        <div className="px-4 pb-2">
          <p className="text-red-400 text-xs text-center">
            {error}
          </p>
        </div>
      )}
    </div>
  );
}