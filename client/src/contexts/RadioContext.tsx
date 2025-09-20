import React, { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { mockRadioData } from '@/data/mockData';

// Check if we're in a static environment (no backend APIs available)
const isStaticEnvironment = () => {
  return typeof window !== 'undefined' && window.location.hostname.includes('vercel.app');
};

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

interface RadioContextType {
  // Estado do player
  isPlaying: boolean;
  volume: number;
  isMuted: boolean;
  isLoading: boolean;
  error: string | null;
  currentTrackIndex: number;
  currentTrackName: string;
  
  // Estado do download em tempo real
  isDownloading: boolean;
  downloadProgress: number;
  
  // Controles
  togglePlay: () => Promise<void>;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  
  // Controles de download em tempo real
  startDownload: () => Promise<void>;
  stopDownload: () => void;
  
  // Dados
  nowPlaying: NowPlayingTrack | undefined;
  breakzFmTracks: Array<{ title: string; artist: string; duration: number }>;
  
  // Funções
  handleDownload: () => Promise<void>;
  
  // Ref do áudio
  audioRef: React.RefObject<HTMLAudioElement>;
}

const RadioContext = createContext<RadioContextType | undefined>(undefined);

export function useRadio() {
  const context = useContext(RadioContext);
  if (context === undefined) {
    throw new Error('useRadio must be used within a RadioProvider');
  }
  return context;
}

interface RadioProviderProps {
  children: ReactNode;
}

export function RadioProvider({ children }: RadioProviderProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  // Current track name for display - will be updated by nowPlaying data
  const [currentTrackName, setCurrentTrackName] = useState('EVOK.FM - Live DJ Mixes');
  const [error, setError] = useState<string | null>(null);
  
  // Estados de download em tempo real
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  
  // Refs para download em tempo real
  const downloadRecorderRef = useRef<MediaRecorder | null>(null);
  const downloadChunksRef = useRef<Blob[]>([]);
  const downloadStartTimeRef = useRef<number>(0);
  const streamUrl = 'https://breakz-high.rautemusik.fm/';

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

  // Fetch current playing track metadata
  const { data: nowPlaying, refetch: refetchNowPlaying } = useQuery<NowPlayingTrack>({
    queryKey: ['/api/radio/now-playing'],
    queryFn: async () => {
      if (isStaticEnvironment()) {
        // Return mock data for static environment
        return {
          title: mockRadioData.currentTrack.title,
          artist: mockRadioData.currentTrack.artist,
          coverUrl: mockRadioData.currentTrack.coverUrl
        };
      }
      // Try API first, fallback to mock data
      try {
        const response = await fetch('/api/radio/now-playing');
        if (!response.ok) throw new Error('API not available');
        return await response.json();
      } catch {
        return {
          title: mockRadioData.currentTrack.title,
          artist: mockRadioData.currentTrack.artist,
          coverUrl: mockRadioData.currentTrack.coverUrl
        };
      }
    },
    refetchInterval: 30000, // Refetch every 30 seconds
    enabled: isPlaying, // Only fetch when radio is playing
  });

  // Download mutation
  const downloadMutation = useMutation<DownloadResponse, Error, { title: string; artist: string }>({
    mutationFn: async ({ title, artist }) => {
      if (isStaticEnvironment()) {
        // In static environment, show contact message
        alert('Para fazer download das músicas, entre em contato via WhatsApp!');
        throw new Error('Download not available in static mode');
      }
      
      try {
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
      } catch (error) {
        // Fallback message for any download error
        alert('Para fazer download das músicas, entre em contato via WhatsApp!');
        throw error;
      }
    },
  });

  // Update current track name when nowPlaying data changes
  useEffect(() => {
    if (nowPlaying && isPlaying) {
      const trackName = `${nowPlaying.artist} - ${nowPlaying.title}`;
      setCurrentTrackName(trackName);
    } else if (!isPlaying) {
      setCurrentTrackName('EVOK.FM - Live DJ Mixes');
    }
  }, [nowPlaying, isPlaying]);

  // Initialize audio volume on mount
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;
      audio.preload = 'none';
    }
  }, [volume]);

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
        
        // Trigger immediate fetch of now playing data
        refetchNowPlaying();
      }
    } catch (err) {
      setError('Erro ao reproduzir. Verifique sua conexão.');
      setIsPlaying(false);
    } finally {
      setIsLoading(false);
    }
  };

  const setVolume = (newVolume: number) => {
    setVolumeState(newVolume);
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

  // Função para iniciar download em tempo real
  const startDownload = async () => {
    try {
      const audio = audioRef.current;
      if (!audio) {
        setError('Elemento de áudio não encontrado');
        return;
      }

      if (!isPlaying) {
        setError('Inicie a reprodução da rádio antes de fazer o download');
        return;
      }

      // Criar contexto de áudio para capturar o stream
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const source = audioContext.createMediaElementSource(audio);
      const destination = audioContext.createMediaStreamDestination();
      
      // Conectar source ao destination E ao contexto de áudio (para manter o som audível)
      source.connect(destination);
      source.connect(audioContext.destination);

      // Criar MediaRecorder para capturar o stream
      const mediaRecorder = new MediaRecorder(destination.stream, {
        mimeType: MediaRecorder.isTypeSupported('audio/webm;codecs=opus') 
          ? 'audio/webm;codecs=opus' 
          : 'audio/webm'
      });

      downloadChunksRef.current = [];
      downloadStartTimeRef.current = Date.now();

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          downloadChunksRef.current.push(event.data);
          // Atualizar progresso baseado no tempo
          const elapsed = (Date.now() - downloadStartTimeRef.current) / 1000;
          setDownloadProgress(Math.min(elapsed, 100));
        }
      };

      mediaRecorder.onstop = async () => {
        const webmBlob = new Blob(downloadChunksRef.current, { type: 'audio/webm' });
        
        try {
          // Gerar nome do arquivo baseado na música atual
          const trackInfo = nowPlaying || { title: 'Live Mix', artist: 'EVOK.FM' };
          const fileName = `${trackInfo.artist} - ${trackInfo.title}.webm`
            .replace(/[<>:"/\\|?*]/g, '_') // Remover caracteres inválidos
            .replace(/\s+/g, ' ') // Normalizar espaços
            .trim();
          
          // Fazer download automático do arquivo WebM
          const url = URL.createObjectURL(webmBlob);
          const a = document.createElement('a');
          a.href = url;
          a.download = fileName;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
          
          setIsDownloading(false);
          setDownloadProgress(0);
          
        } catch (error) {
          console.error('Erro no download:', error);
          setError('Erro ao processar o download');
          setIsDownloading(false);
          setDownloadProgress(0);
        }
        
        // Desconectar source antes de fechar o contexto
        try {
          source.disconnect();
          await audioContext.close();
        } catch (error) {
          console.warn('Erro ao fechar contexto de download:', error);
        }
        
        // Reconectar o áudio ao sistema padrão
        try {
          // Forçar reconexão pausando e tocando novamente
          if (audio && isPlaying) {
            audio.load(); // Recarregar o elemento de áudio
            await audio.play(); // Tocar novamente
          }
        } catch (error) {
          console.warn('Erro ao reconectar áudio:', error);
        }
      };

      downloadRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setIsDownloading(true);
      setDownloadProgress(0);

    } catch (error) {
      console.error('Erro ao iniciar download:', error);
      setError('Erro ao iniciar download da música');
      setIsDownloading(false);
      setDownloadProgress(0);
    }
  };

  // Função para parar download em tempo real
  const stopDownload = () => {
    if (downloadRecorderRef.current && isDownloading) {
      downloadRecorderRef.current.stop();
      setIsDownloading(false);
      setDownloadProgress(0);
    }
  };

  // Cleanup ao desmontar
  useEffect(() => {
    return () => {
      if (downloadRecorderRef.current && isDownloading) {
        downloadRecorderRef.current.stop();
      }
    };
  }, [isDownloading]);

  const contextValue: RadioContextType = {
    isPlaying,
    volume,
    isMuted,
    isLoading,
    error,
    currentTrackIndex,
    currentTrackName,
    isDownloading,
    downloadProgress,
    togglePlay,
    setVolume,
    toggleMute,
    startDownload,
    stopDownload,
    nowPlaying,
    breakzFmTracks,
    handleDownload,
    audioRef,
  };

  return (
    <RadioContext.Provider value={contextValue}>
      {/* Audio element global - sempre presente */}
      <audio
        ref={audioRef}
        preload="none"
        crossOrigin="anonymous"
        playsInline
        controls={false}
        autoPlay={false}
      />
      {children}
    </RadioContext.Provider>
  );
}