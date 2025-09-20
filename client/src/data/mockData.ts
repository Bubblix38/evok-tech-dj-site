import { type MusicPack } from "@shared/schema";

// Mock data for when APIs are not available (static deployment)
export const mockMusicPacks: MusicPack[] = [
  {
    id: "1",
    title: "Funk Carioca Hits",
    artist: "DJ Evok Tech",
    genre: "Funk",
    bpm: 130,
    key: "Am",
    duration: 180,
    price: 15.99,
    coverUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
    audioPreviewUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
    tags: ["funk", "carioca", "hits"],
    description: "Os melhores hits do funk carioca para suas festas",
    featured: true,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01")
  },
  {
    id: "2", 
    title: "Baile Funk Mix",
    artist: "DJ Evok Tech",
    genre: "Funk",
    bpm: 128,
    key: "Gm",
    duration: 240,
    price: 19.99,
    coverUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
    audioPreviewUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
    tags: ["baile", "funk", "mix"],
    description: "Mix exclusivo para bailes funk",
    featured: true,
    createdAt: new Date("2024-01-02"),
    updatedAt: new Date("2024-01-02")
  },
  {
    id: "3",
    title: "Funk Melody Pack",
    artist: "DJ Evok Tech", 
    genre: "Funk Melody",
    bpm: 125,
    key: "C",
    duration: 200,
    price: 12.99,
    coverUrl: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&h=400&fit=crop",
    audioPreviewUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
    tags: ["funk", "melody", "romantic"],
    description: "Funk melody para momentos especiais",
    featured: false,
    createdAt: new Date("2024-01-03"),
    updatedAt: new Date("2024-01-03")
  },
  {
    id: "4",
    title: "Funk Ostentação",
    artist: "DJ Evok Tech",
    genre: "Funk",
    bpm: 132,
    key: "Dm",
    duration: 220,
    price: 17.99,
    coverUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop",
    audioPreviewUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
    tags: ["funk", "ostentação", "party"],
    description: "Funk ostentação para arrasar na pista",
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