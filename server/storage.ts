import { type User, type InsertUser, type MusicPack, type InsertMusicPack } from "@shared/schema";
import { randomUUID } from "crypto";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Music Pack methods
  getMusicPacks(): Promise<MusicPack[]>;
  getMusicPack(id: string): Promise<MusicPack | undefined>;
  createMusicPack(pack: InsertMusicPack): Promise<MusicPack>;
  updateMusicPack(id: string, pack: Partial<InsertMusicPack>): Promise<MusicPack | undefined>;
  deleteMusicPack(id: string): Promise<boolean>;
  getFeaturedMusicPacks(): Promise<MusicPack[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private musicPacks: Map<string, MusicPack>;

  constructor() {
    this.users = new Map();
    this.musicPacks = new Map();
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Add sample music packs
    const samplePacks: InsertMusicPack[] = [
      {
        title: "Evok Tech DJ",
        artist: "EVOK TECH DJ",
        coverUrl: "/assets/generated_images/90s_remix_pack_cover_cf424b48.png",
        duration: "45:30",
        tracks: 15,
        genre: "Remix/House",
        size: "120 MB",
        releaseDate: "2025-01-15",
        featured: true,
        audioPreviewUrl: "/assets/audio/sample-preview.mp3",
        downloadUrl: "/assets/packs/evok-tech-dj.zip"
      },
      {
        title: "Latin Fusion *UPDATE",
        artist: "EVOK TECH DJ",
        coverUrl: "/assets/generated_images/90s_remix_pack_cover_cf424b48.png",
        duration: "38:45",
        tracks: 12,
        genre: "Latin/Fusion",
        size: "95 MB",
        releaseDate: "2025-01-10",
        featured: true,
        audioPreviewUrl: "/assets/audio/latin-fusion-preview.mp3",
        downloadUrl: "/assets/packs/latin-fusion.zip"
      },
      {
        title: "Tribal Fusion Vol. 1",
        artist: "EVOK TECH DJ",
        coverUrl: "/assets/generated_images/90s_remix_pack_cover_cf424b48.png",
        duration: "42:15",
        tracks: 14,
        genre: "Tribal/House",
        size: "110 MB",
        releaseDate: "2025-01-08",
        featured: true,
        audioPreviewUrl: "/assets/audio/tribal-fusion-preview.mp3",
        downloadUrl: "/assets/packs/tribal-fusion.zip"
      },
      {
        title: "Funky House Essentials 2025",
        artist: "EVOK TECH DJ",
        coverUrl: "/assets/generated_images/90s_remix_pack_cover_cf424b48.png",
        duration: "52:30",
        tracks: 18,
        genre: "Funky House",
        size: "140 MB",
        releaseDate: "2025-01-05",
        featured: true,
        audioPreviewUrl: "/assets/audio/funky-house-preview.mp3",
        downloadUrl: "/assets/packs/funky-house.zip"
      },
      {
        title: "Dance-Pop 2025",
        artist: "EVOK TECH DJ",
        coverUrl: "/assets/generated_images/90s_remix_pack_cover_cf424b48.png",
        duration: "35:20",
        tracks: 11,
        genre: "Dance-Pop",
        size: "85 MB",
        releaseDate: "2025-01-03",
        featured: false,
        audioPreviewUrl: "/assets/audio/dance-pop-preview.mp3",
        downloadUrl: "/assets/packs/dance-pop.zip"
      },
      {
        title: "Evok Tech DJ (2nd Edition)",
        artist: "EVOK TECH DJ",
        coverUrl: "/assets/generated_images/90s_remix_pack_cover_cf424b48.png",
        duration: "48:10",
        tracks: 16,
        genre: "Remix/Retro",
        size: "125 MB",
        releaseDate: "2024-12-28",
        featured: false,
        audioPreviewUrl: "/assets/audio/evok-tech-2nd-preview.mp3",
        downloadUrl: "/assets/packs/evok-tech-2nd.zip"
      }
    ];

    samplePacks.forEach(pack => {
      this.createMusicPack(pack);
    });
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Music Pack methods
  async getMusicPacks(): Promise<MusicPack[]> {
    return Array.from(this.musicPacks.values()).sort((a, b) => 
      new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
    );
  }

  async getMusicPack(id: string): Promise<MusicPack | undefined> {
    return this.musicPacks.get(id);
  }

  async createMusicPack(insertPack: InsertMusicPack): Promise<MusicPack> {
    const id = randomUUID();
    const now = new Date();
    const pack: MusicPack = { 
      ...insertPack,
      id, 
      createdAt: now,
      updatedAt: now,
      coverUrl: insertPack.coverUrl || null,
      featured: insertPack.featured ?? false,
      audioPreviewUrl: insertPack.audioPreviewUrl || null,
      downloadUrl: insertPack.downloadUrl || null
    };
    this.musicPacks.set(id, pack);
    return pack;
  }

  async updateMusicPack(id: string, updates: Partial<InsertMusicPack>): Promise<MusicPack | undefined> {
    const existing = this.musicPacks.get(id);
    if (!existing) return undefined;

    const updated: MusicPack = {
      ...existing,
      ...updates,
      updatedAt: new Date()
    };
    this.musicPacks.set(id, updated);
    return updated;
  }

  async deleteMusicPack(id: string): Promise<boolean> {
    return this.musicPacks.delete(id);
  }

  async getFeaturedMusicPacks(): Promise<MusicPack[]> {
    const allPacks = await this.getMusicPacks();
    return allPacks.filter(pack => pack.featured);
  }
}

export const storage = new MemStorage();
