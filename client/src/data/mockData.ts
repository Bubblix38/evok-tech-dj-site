import { type MusicPack } from "@shared/schema";

// Mock data for when APIs are not available (static deployment)
export const mockMusicPacks: MusicPack[] = [
  {
    id: "1",
    title: "Funk Carioca Hits",
    artist: "DJ Evok Tech",
    genre: "Funk",
    duration: "180",
    tracks: 15,
    size: "45 MB",
    releaseDate: "2024-01-01",
    coverUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
    audioPreviewUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
    downloadUrl: null,
    featured: true,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01")
  },
  {
    id: "2", 
    title: "Baile Funk Mix",
    artist: "DJ Evok Tech",
    genre: "Funk",
    duration: "240",
    tracks: 20,
    size: "60 MB",
    releaseDate: "2024-01-02",
    coverUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
    audioPreviewUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
    downloadUrl: null,
    featured: true,
    createdAt: new Date("2024-01-02"),
    updatedAt: new Date("2024-01-02")
  },
  {
    id: "3",
    title: "Funk Melody Pack",
    artist: "DJ Evok Tech", 
    genre: "Funk Melody",
    duration: "200",
    tracks: 12,
    size: "38 MB",
    releaseDate: "2024-01-03",
    coverUrl: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&h=400&fit=crop",
    audioPreviewUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
    downloadUrl: null,
    featured: false,
    createdAt: new Date("2024-01-03"),
    updatedAt: new Date("2024-01-03")
  },
  {
    id: "4",
    title: "Funk Ostentação",
    artist: "DJ Evok Tech",
    genre: "Funk",
    duration: "220",
    tracks: 18,
    size: "52 MB",
    releaseDate: "2024-01-04",
    coverUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop",
    audioPreviewUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
    downloadUrl: null,
    featured: false,
    createdAt: new Date("2024-01-04"),
    updatedAt: new Date("2024-01-04")
  }
];

export const mockRadioData = {
  isPlaying: false,
  currentTrack: {
    title: "Funk Mix Live",
    artist: "DJ Evok Tech",
    coverUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop"
  },
  streamUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
};