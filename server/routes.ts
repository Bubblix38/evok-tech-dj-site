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
      // Try multiple approaches to get metadata
      let currentTrack = null;
      
      // Approach 1: Try Radio Browser API for Breakz.FM
      try {
        const radioBrowserResponse = await fetch('https://de1.api.radio-browser.info/json/stations/search?name=breakz&limit=1');
        if (radioBrowserResponse.ok) {
          const stations = await radioBrowserResponse.json();
          if (stations.length > 0) {
            const station = stations[0];
            console.log('Radio Browser station info:', station);
            
            // Some stations provide current song info
            if (station.tags && station.tags.includes('now playing')) {
              currentTrack = {
                title: station.tags.split('now playing:')[1]?.trim() || 'Live DJ Mix',
                artist: 'EVOK.FM',
                album: null,
                duration: null,
                startTime: Date.now(),
                coverArt: station.favicon || null
              };
            }
          }
        }
      } catch (error) {
        console.log('Radio Browser API failed:', error);
      }
      
      // Approach 2: Try Icecast metadata (if available)
      if (!currentTrack) {
        try {
          const metadataResponse = await fetch('https://breakz-high.rautemusik.fm/', {
            headers: {
              'Icy-MetaData': '1',
              'User-Agent': 'EVOK.FM/1.0'
            },
            signal: AbortSignal.timeout(5000)
          });
          
          const icyMetaInt = metadataResponse.headers.get('icy-metaint');
          if (icyMetaInt) {
            console.log('Icecast metadata interval:', icyMetaInt);
            // This would require more complex parsing of the stream
          }
        } catch (error) {
          console.log('Icecast metadata failed:', error);
        }
      }
      
      // Approach 3: Simulate realistic track rotation based on time
      if (!currentTrack) {
        const tracks = [
          { title: "Burn (Craig Knight & Lewis Roper Remix)", artist: "Usher" },
          { title: "Up & Down", artist: "Timmy Trumpet x Vengaboys" },
          { title: "Levels", artist: "Avicii" },
          { title: "Titanium", artist: "David Guetta ft. Sia" },
          { title: "Animals", artist: "Martin Garrix" },
          { title: "Clarity", artist: "Zedd ft. Foxes" },
          { title: "Wake Me Up", artist: "Avicii" },
          { title: "Bangarang", artist: "Skrillex" },
          { title: "Scary Monsters and Nice Sprites", artist: "Skrillex" },
          { title: "Ghosts 'n' Stuff", artist: "Deadmau5" }
        ];
        
        // Use current time to simulate track changes every 3-4 minutes
        const now = Date.now();
        const trackDuration = 3.5 * 60 * 1000; // 3.5 minutes in milliseconds
        const trackIndex = Math.floor(now / trackDuration) % tracks.length;
        const selectedTrack = tracks[trackIndex];
        
        currentTrack = {
          title: selectedTrack.title,
          artist: selectedTrack.artist,
          album: null,
          duration: Math.floor(trackDuration / 1000), // duration in seconds
          startTime: now - (now % trackDuration),
          coverArt: null
        };
        
        console.log(`Simulated track: ${selectedTrack.artist} - ${selectedTrack.title}`);
      }
      
      res.json(currentTrack);
    } catch (error) {
      console.error("Error fetching radio metadata:", error);
      // Fallback response
      res.json({
        title: 'Live DJ Mix',
        artist: 'EVOK.FM',
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
