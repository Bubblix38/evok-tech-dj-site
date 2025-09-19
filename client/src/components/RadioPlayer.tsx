import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Radio, Music, Download, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

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
  const [currentTrack, setCurrentTrack] = useState('Breakz.FM - Live DJ Mixes');
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

  // Initialize audio volume on mount
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;
    }
  }, []);

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

    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('error', handleError);
    audio.addEventListener('loadeddata', handleLoadedData);

    return () => {
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('loadeddata', handleLoadedData);
    };
  }, []);

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
      } else {
        setIsLoading(true);
        setError(null);
        
        // Set the stream URL and load
        audio.src = streamUrl;
        audio.volume = isMuted ? 0 : volume;
        audio.load();
        
        await audio.play();
        setIsPlaying(true);
        setCurrentTrack('Breakz.FM - Live DJ Mixes');
        
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
    const track = nowPlaying || { title: 'Live DJ Mix', artist: 'Breakz.FM' };
    
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
      setCurrentTrack(`${nowPlaying.artist} - ${nowPlaying.title}`);
    }
  }, [nowPlaying, isPlaying]);

  return (
    <div className={`bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 border border-purple-400/30 rounded-lg p-6 shadow-2xl ${className}`} data-testid="radio-player">
      <audio
        ref={audioRef}
        preload="none"
        crossOrigin="anonymous"
      />
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
          <Radio className="w-6 h-6 text-purple-900" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-yellow-400 font-orbitron">BREAKZ.FM</h3>
          <p className="text-purple-200 text-sm">Live DJ Mixes • Hip-Hop • EDM</p>
        </div>
      </div>

      {/* Current Track */}
      <div className="bg-black/20 rounded-lg p-4 mb-4 border border-purple-400/20">
        <div className="flex items-center gap-2 mb-2">
          <Music className="w-4 h-4 text-yellow-400" />
          <span className="text-purple-200 text-xs font-semibold">TOCANDO AGORA</span>
        </div>
        <p className="text-white font-medium text-sm">
          {isPlaying ? currentTrack : 'Pronto para tocar'}
        </p>
        {error && (
          <p className="text-red-400 text-xs mt-1">{error}</p>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        {/* Play/Pause Button */}
        <Button
          onClick={togglePlay}
          disabled={isLoading}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-purple-900 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          data-testid="button-radio-toggle"
        >
          {isLoading ? (
            <div className="w-6 h-6 border-2 border-purple-900 border-t-transparent rounded-full animate-spin" />
          ) : isPlaying ? (
            <Pause className="w-6 h-6" fill="currentColor" />
          ) : (
            <Play className="w-6 h-6 ml-0.5" fill="currentColor" />
          )}
        </Button>

        {/* Download Button */}
        <Button
          onClick={handleDownload}
          disabled={!isPlaying || downloadMutation.isPending}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          data-testid="button-radio-download"
          title="Download current track in high quality"
        >
          {downloadMutation.isPending ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Download className="w-5 h-5" />
          )}
        </Button>

        {/* Volume Controls */}
        <div className="flex items-center gap-2 flex-1">
          <Button
            onClick={toggleMute}
            variant="ghost"
            size="icon"
            className="text-purple-200 hover:text-yellow-400 transition-colors"
            data-testid="button-radio-mute"
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="w-5 h-5" />
            ) : (
              <Volume2 className="w-5 h-5" />
            )}
          </Button>
          
          <div className="flex-1 max-w-32">
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              style={{'--volume': `${(isMuted ? 0 : volume) * 100}%`} as React.CSSProperties}
              className="w-full h-2 bg-purple-700 rounded-lg appearance-none cursor-pointer volume-slider"
              data-testid="slider-radio-volume"
            />
          </div>
          
          <span className="text-purple-200 text-xs font-mono min-w-8">
            {Math.round((isMuted ? 0 : volume) * 100)}%
          </span>
        </div>
      </div>

      {/* Status Indicator */}
      <div className="flex items-center justify-center mt-4 pt-4 border-t border-purple-400/20">
        <div className={`w-2 h-2 rounded-full mr-2 ${
          isLoading ? 'bg-yellow-400 animate-pulse' : 
          isPlaying ? 'bg-green-400 animate-pulse' : 
          error ? 'bg-red-500' : 'bg-gray-500'
        }`} />
        <span className="text-purple-200 text-xs">
          {isLoading ? 'CONECTANDO...' : 
           isPlaying ? 'AO VIVO' : 
           error ? 'OFFLINE' : 'PRONTO'}
        </span>
      </div>
    </div>
  );
}