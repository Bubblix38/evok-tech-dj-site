import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume1, Volume2, VolumeX, Radio, Music, Download, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useRadio } from '@/contexts/RadioContext';

interface RadioPlayerProps {
  className?: string;
}

interface NowPlayingTrack {
  title: string;
  artist: string;
  album?: string | null;
  duration?: number | null;
  startTime: number;
  coverArt?: string | null;
}

interface DownloadResponse {
  track: { title: string; artist: string };
  searchQuery: string;
  searchUrls: {
    youtube: string;
    soundcloud: string;
    spotify: string;
    amazon: string;
    apple: string;
  };
  message: string;
}

export default function RadioPlayer({ className = '' }: RadioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  // Simulação de músicas reais do EVOK.FM
  const breakzFmTracks = [
    { title: "Burn (Craig Knight & Lewis Roper Remix)", artist: "Usher", duration: 180 },
    { title: "One In A Million", artist: "Bebe Rexha & David Guetta", duration: 240 },
    { title: "Won't Be Possible", artist: "Tiësto, Odd Mob, Goodboys", duration: 320 },
    { title: "Drinkin'", artist: "Joel Corry, MK & Rita Ora", duration: 200 },
    { title: "Sing Hallelujah (Dakaos & Calin Remix)", artist: "Dr. Alban", duration: 245 },
    { title: "Rainfall (Praise You)", artist: "Tom Santa", duration: 185 },
    { title: "Rain In Ibiza", artist: "Felix Jaehn & The Stickmen Project feat. Calum Scott", duration: 270 },
    { title: "Midnight (The Hanging Tree)", artist: "HOSH & 1979 feat. Jalja", duration: 215 },
    { title: "It's Not Right But It's Okay", artist: "Felix Jaehn, Whitney Houston", duration: 390 },
    { title: "Aire", artist: "Steve Aoki, Farruko", duration: 300 }
  ];

  const currentTrack = breakzFmTracks[currentTrackIndex];
  const [currentTrackName, setCurrentTrackName] = useState('EVOK.FM - Live DJ Mixes');
  const [error, setError] = useState<string | null>(null);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const streamUrl = 'https://breakz-high.rautemusik.fm/';

  // Fetch current playing track metadata
  const { data: nowPlaying, refetch: refetchNowPlaying } = useQuery<NowPlayingTrack>({
    queryKey: ['/api/radio/now-playing'],
    refetchInterval: 30000, // Refetch every 30 seconds
    enabled: isPlaying, // Only fetch when radio is playing
  });

  // Download mutation
  const downloadMutation = useMutation<DownloadResponse, Error, { title: string; artist: string }>({
    mutationFn: async ({ title, artist }) => {
      const response = await fetch('/api/radio/download-current', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, artist })
      });
      
      if (!response.ok) {
        throw new Error('Failed to get download links');
      }
      
      return response.json();
    },
  });

  // Initialize audio volume on mount and setup track rotation
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;
      // Prevent audio from restarting on scroll or page interactions
      audio.preload = 'none';
    }

    // Simulate track changes every 30 seconds when playing
    let trackInterval: NodeJS.Timeout;
    if (isPlaying) {
      trackInterval = setInterval(() => {
        setCurrentTrackIndex((prevIndex) => 
          (prevIndex + 1) % breakzFmTracks.length
        );
      }, 30000); // Change track every 30 seconds
    }

    return () => {
      if (trackInterval) {
        clearInterval(trackInterval);
      }
    };
  }, [isPlaying, breakzFmTracks.length]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadStart = () => {
      setIsLoading(true);
      setError(null);
    };
    const handleCanPlay = () => {
      setIsLoading(false);
      setError(null);
    };
    const handleError = (e: Event) => {
      setIsLoading(false);
      setError('Falha ao conectar com a rádio');
      setIsPlaying(false);
    };
    const handleLoadedData = () => {
      setIsLoading(false);
    };
    const handlePause = () => {
      // Only update state if it wasn't manually paused
      if (isPlaying && !audio.ended) {
        setIsPlaying(false);
      }
    };
    const handlePlay = () => {
      setIsPlaying(true);
    };

    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('error', handleError);
    audio.addEventListener('loadeddata', handleLoadedData);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('play', handlePlay);

    return () => {
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('loadeddata', handleLoadedData);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('play', handlePlay);
    };
  }, [isPlaying]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) {
      console.error('Audio element not available');
      return;
    }

    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
        setIsLoading(false);
      } else {
        setIsLoading(true);
        setError(null);
        
        // Only set src if it's not already set to avoid reloading
        if (audio.src !== streamUrl) {
          audio.src = streamUrl;
          audio.volume = isMuted ? 0 : volume;
          audio.load();
        }
        
        await audio.play();
        setIsPlaying(true);
        setCurrentTrackName('EVOK.FM - Live DJ Mixes');
        
        // Start fetching metadata when playing
        refetchNowPlaying();
      }
    } catch (err) {
      setError('Erro ao reproduzir. Verifique sua conexão.');
      setIsPlaying(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    if (newVolume === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.volume = volume;
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  };

  const handleDownload = async () => {
    const track = nowPlaying || { title: 'Live DJ Mix', artist: 'EVOK.FM' };
    
    try {
      const result = await downloadMutation.mutateAsync({
        title: track.title,
        artist: track.artist
      });
      
      // Open multiple search platforms for user to choose
      const searchUrls = result.searchUrls;
      
      // Create a popup with download options
      const popup = window.open('', 'download-options', 'width=600,height=400');
      popup?.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Download ${track.title} - ${track.artist}</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              padding: 20px; 
              background: linear-gradient(135deg, #7c3aed, #a855f7);
              color: white;
              margin: 0;
            }
            .container {
              max-width: 500px;
              margin: 0 auto;
              text-align: center;
            }
            h2 { margin-bottom: 10px; }
            .track-info {
              background: rgba(255,255,255,0.1);
              padding: 15px;
              border-radius: 8px;
              margin: 20px 0;
            }
            .download-links {
              display: grid;
              gap: 10px;
              margin-top: 20px;
            }
            .download-btn {
              display: block;
              padding: 12px 20px;
              background: rgba(255,255,255,0.2);
              color: white;
              text-decoration: none;
              border-radius: 6px;
              transition: background 0.3s;
              border: 1px solid rgba(255,255,255,0.3);
            }
            .download-btn:hover {
              background: rgba(255,255,255,0.3);
            }
            .close-btn {
              margin-top: 20px;
              padding: 8px 16px;
              background: #ef4444;
              color: white;
              border: none;
              border-radius: 4px;
              cursor: pointer;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h2>🎵 Download High Quality Music</h2>
            <div class="track-info">
              <h3>${track.title}</h3>
              <p>by ${track.artist}</p>
            </div>
            <p>Choose your preferred platform for high-quality download:</p>
            <div class="download-links">
              <a href="${searchUrls.youtube}" target="_blank" class="download-btn">
                🎬 YouTube (MP3/MP4)
              </a>
              <a href="${searchUrls.soundcloud}" target="_blank" class="download-btn">
                🎧 SoundCloud (High Quality)
              </a>
              <a href="${searchUrls.spotify}" target="_blank" class="download-btn">
                🎵 Spotify (Premium Required)
              </a>
              <a href="${searchUrls.amazon}" target="_blank" class="download-btn">
                🛒 Amazon Music
              </a>
              <a href="${searchUrls.apple}" target="_blank" class="download-btn">
                🍎 Apple Music
              </a>
            </div>
            <button class="close-btn" onclick="window.close()">Close Window</button>
          </div>
        </body>
        </html>
      `);
    } catch (error) {
      console.error('Download error:', error);
    }
  };

  // Update current track display when metadata is available
  useEffect(() => {
    if (nowPlaying && isPlaying) {
      setCurrentTrackName(`${nowPlaying.artist} - ${nowPlaying.title}`);
    }
  }, [nowPlaying, isPlaying]);

  return (
    <div className={`${className.includes('fixed') ? 'fixed bottom-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-md border-t border-gray-700 shadow-2xl' : className || 'bg-gray-900/95 backdrop-blur-md border border-gray-700 rounded-lg shadow-2xl p-4'}`} data-testid="radio-player">
      <audio
        ref={audioRef}
        preload="none"
        crossOrigin="anonymous"
        playsInline
        controls={false}
        autoPlay={false}
      />
      
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
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <span className="font-semibold text-white">EVOK.FM</span>
            {/* Status indicator ao lado do nome */}
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-green-400 animate-pulse' : 'bg-gray-500'}`} />
              <span className="text-xs text-gray-400 font-medium">
                {isLoading ? 'Verbindung...' : isPlaying ? 'LIVE' : 'Offline'}
              </span>
            </div>
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