import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertMusicPackSchema } from "@shared/schema";
import { z } from "zod";
import path from "path";
import { promises as fs } from "fs";

export async function registerRoutes(app: Express): Promise<Server> {
  // Music Packs API Routes
  
  // Get all music packs
  app.get("/api/packs", async (req, res) => {
    try {
      const packs = await storage.getMusicPacks();
      res.json(packs);
    } catch (error) {
      console.error("Error fetching packs:", error);
      res.status(500).json({ error: "Failed to fetch music packs" });
    }
  });

  // Get featured music packs
  app.get("/api/packs/featured", async (req, res) => {
    try {
      const featuredPacks = await storage.getFeaturedMusicPacks();
      res.json(featuredPacks);
    } catch (error) {
      console.error("Error fetching featured packs:", error);
      res.status(500).json({ error: "Failed to fetch featured packs" });
    }
  });

  // Get single music pack
  app.get("/api/packs/:id", async (req, res) => {
    try {
      const pack = await storage.getMusicPack(req.params.id);
      if (!pack) {
        return res.status(404).json({ error: "Music pack not found" });
      }
      res.json(pack);
    } catch (error) {
      console.error("Error fetching pack:", error);
      res.status(500).json({ error: "Failed to fetch music pack" });
    }
  });

  // Create new music pack (for admin/content management)
  app.post("/api/packs", async (req, res) => {
    try {
      const validatedData = insertMusicPackSchema.parse(req.body);
      const newPack = await storage.createMusicPack(validatedData);
      res.status(201).json(newPack);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid pack data", details: error.errors });
      }
      console.error("Error creating pack:", error);
      res.status(500).json({ error: "Failed to create music pack" });
    }
  });

  // Update music pack
  app.patch("/api/packs/:id", async (req, res) => {
    try {
      const updates = insertMusicPackSchema.partial().parse(req.body);
      const updatedPack = await storage.updateMusicPack(req.params.id, updates);
      if (!updatedPack) {
        return res.status(404).json({ error: "Music pack not found" });
      }
      res.json(updatedPack);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid update data", details: error.errors });
      }
      console.error("Error updating pack:", error);
      res.status(500).json({ error: "Failed to update music pack" });
    }
  });

  // Delete music pack
  app.delete("/api/packs/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteMusicPack(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Music pack not found" });
      }
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting pack:", error);
      res.status(500).json({ error: "Failed to delete music pack" });
    }
  });

  // Download music pack
  app.get("/api/packs/:id/download", async (req, res) => {
    try {
      const pack = await storage.getMusicPack(req.params.id);
      if (!pack) {
        return res.status(404).json({ error: "Music pack not found" });
      }

      if (!pack.downloadUrl) {
        return res.status(404).json({ error: "Download not available for this pack" });
      }

      // In a real implementation, you would:
      // 1. Check if file exists
      // 2. Stream the file to user
      // 3. Track downloads/analytics
      // For now, we'll return the download URL
      res.json({ 
        downloadUrl: pack.downloadUrl,
        filename: `${pack.title}.zip`,
        size: pack.size
      });
    } catch (error) {
      console.error("Error processing download:", error);
      res.status(500).json({ error: "Failed to process download" });
    }
  });

  // Radio API Routes
  
  // Get current playing track metadata from Breakz.FM
  app.get("/api/radio/now-playing", async (req, res) => {
    try {
      // Try to fetch metadata from RauteMusik API (Breakz.FM parent network)
      const response = await fetch('https://www.rautemusik.fm/api/playlist.php?radio=breakz', {
        headers: {
          'User-Agent': 'EVOK-TECH-DJ/1.0'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      const data = await response.json();
      
      // Extract current track info
      const currentTrack = {
        title: data.current?.title || 'Live DJ Mix',
        artist: data.current?.artist || 'Breakz.FM',
        album: data.current?.album || null,
        duration: data.current?.duration || null,
        startTime: data.current?.start_time || Date.now(),
        coverArt: data.current?.cover || null
      };
      
      res.json(currentTrack);
    } catch (error) {
      console.error("Error fetching radio metadata:", error);
      // Fallback response
      res.json({
        title: 'Live DJ Mix',
        artist: 'Breakz.FM',
        album: null,
        duration: null,
        startTime: Date.now(),
        coverArt: null
      });
    }
  });

  // Search and download current track
  app.post("/api/radio/download-current", async (req, res) => {
    try {
      const { title, artist } = req.body;
      
      if (!title || !artist) {
        return res.status(400).json({ error: "Title and artist are required" });
      }
      
      // Search query for the track
      const searchQuery = `${artist} ${title}`.trim();
      
      // For now, we'll return a search URL that opens in new tab
      // In a production app, you'd integrate with YouTube API, SoundCloud API, etc.
      const searchUrls = {
        youtube: `https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`,
        soundcloud: `https://soundcloud.com/search?q=${encodeURIComponent(searchQuery)}`,
        spotify: `https://open.spotify.com/search/${encodeURIComponent(searchQuery)}`,
        amazon: `https://music.amazon.com/search/${encodeURIComponent(searchQuery)}`,
        apple: `https://music.apple.com/search?term=${encodeURIComponent(searchQuery)}`
      };
      
      res.json({
        track: { title, artist },
        searchQuery,
        searchUrls,
        message: "Search links for high-quality download"
      });
    } catch (error) {
      console.error("Error processing download request:", error);
      res.status(500).json({ error: "Failed to process download request" });
    }
  });

  // Serve static assets (covers, audio previews, etc.)
  app.use("/assets", (req, res, next) => {
    // Set appropriate headers for audio files
    if (req.path.endsWith('.mp3') || req.path.endsWith('.wav')) {
      res.setHeader('Accept-Ranges', 'bytes');
      res.setHeader('Content-Type', 'audio/mpeg');
    }
    next();
  });

  const httpServer = createServer(app);

  return httpServer;
}
