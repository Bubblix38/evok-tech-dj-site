import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const musicPacks = pgTable("music_packs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  artist: text("artist").notNull(),
  coverUrl: text("cover_url"),
  duration: text("duration").notNull(),
  tracks: integer("tracks").notNull(),
  genre: text("genre").notNull(),
  size: text("size").notNull(),
  releaseDate: text("release_date").notNull(),
  featured: boolean("featured").default(false),
  audioPreviewUrl: text("audio_preview_url"),
  downloadUrl: text("download_url"),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertMusicPackSchema = createInsertSchema(musicPacks).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertMusicPack = z.infer<typeof insertMusicPackSchema>;
export type MusicPack = typeof musicPacks.$inferSelect;
