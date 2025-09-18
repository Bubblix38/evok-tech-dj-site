import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX } from "lucide-react";

interface Track {
  id: string;
  title: string;
  artist: string;
  duration: number; // in seconds
  url: string;
}

interface AudioPlayerProps {
  currentTrack?: Track;
  isVisible: boolean;
  onNext?: () => void;
  onPrevious?: () => void;
  onClose?: () => void;
}

export default function AudioPlayer({ currentTrack, isVisible, onNext, onPrevious, onClose }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setCurrentTime(0);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [currentTrack]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      console.log("Audio paused");
    } else {
      // Try to play, handle errors gracefully
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            console.log("Audio playing");
          })
          .catch((error) => {
            console.warn("Audio playback failed (demo mode):", error.message);
            // Simulate playback for demo purposes
            setIsPlaying(true);
            setCurrentTime(0);
            // Auto-pause after 3 seconds in demo mode
            setTimeout(() => {
              setIsPlaying(false);
              setCurrentTime(0);
            }, 3000);
          });
      }
    }
  };

  const handleSeek = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;
    
    const seekTime = (value[0] / 100) * currentTrack.duration;
    audio.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const handleVolumeChange = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const newVolume = value[0];
    setVolume(newVolume);
    audio.volume = newVolume / 100;
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    
    if (isMuted) {
      audio.volume = volume / 100;
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isVisible || !currentTrack) {
    return null;
  }

  const progress = currentTrack.duration > 0 ? (currentTime / currentTrack.duration) * 100 : 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-border backdrop-blur-md">
      <audio
        ref={audioRef}
        src={currentTrack.url}
        preload="metadata"
      />
      
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center gap-4">
          {/* Track Info */}
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="w-12 h-12 bg-primary/20 rounded-md flex items-center justify-center flex-shrink-0">
              <Play className="w-5 h-5 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="font-display font-medium text-card-foreground truncate" data-testid="text-current-track">
                {currentTrack.title}
              </p>
              <p className="text-muted-foreground text-sm font-body truncate" data-testid="text-current-artist">
                {currentTrack.artist}
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                onPrevious?.();
                console.log("Previous track");
              }}
              data-testid="button-previous"
              className="hover-elevate"
            >
              <SkipBack className="w-4 h-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={togglePlay}
              data-testid="button-play-pause"
              className="hover-elevate"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5" />
              )}
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                onNext?.();
                console.log("Next track");
              }}
              data-testid="button-next"
              className="hover-elevate"
            >
              <SkipForward className="w-4 h-4" />
            </Button>
          </div>

          {/* Progress */}
          <div className="hidden md:flex items-center gap-3 flex-1 max-w-md">
            <span className="text-xs text-muted-foreground font-mono w-12">
              {formatTime(currentTime)}
            </span>
            <Slider
              value={[progress]}
              max={100}
              step={1}
              onValueChange={handleSeek}
              className="flex-1"
            />
            <span className="text-xs text-muted-foreground font-mono w-12">
              {formatTime(currentTrack.duration)}
            </span>
          </div>

          {/* Volume */}
          <div className="hidden md:flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMute}
              data-testid="button-mute"
              className="hover-elevate"
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </Button>
            <div className="w-24">
              <Slider
                value={[isMuted ? 0 : volume]}
                max={100}
                step={1}
                onValueChange={handleVolumeChange}
                className="w-full"
              />
            </div>
          </div>

          {/* Close Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              onClose?.();
              console.log("Player closed");
            }}
            data-testid="button-close-player"
            className="hover-elevate"
          >
            ×
          </Button>
        </div>
      </div>
    </div>
  );
}