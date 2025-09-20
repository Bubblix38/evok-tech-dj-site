import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { type MusicPack } from "@shared/schema";
import { mockMusicPacks } from "@/data/mockData";

// Check if we're in a static environment (no backend APIs available)
const isStaticEnvironment = () => {
  return typeof window !== 'undefined' && window.location.hostname.includes('vercel.app');
};

// Hook to fetch all music packs
export function useMusicPacks() {
  return useQuery<MusicPack[]>({
    queryKey: ['/api/packs'],
    queryFn: async () => {
      if (isStaticEnvironment()) {
        return mockMusicPacks;
      }
      // Try API first, fallback to mock data
      try {
        const response = await fetch('/api/packs');
        if (!response.ok) throw new Error('API not available');
        return await response.json();
      } catch {
        return mockMusicPacks;
      }
    },
    select: (data) => data || [],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Hook to fetch featured music packs
export function useFeaturedPacks() {
  return useQuery<MusicPack[]>({
    queryKey: ['/api/packs/featured'],
    queryFn: async () => {
      if (isStaticEnvironment()) {
        return mockMusicPacks.filter(pack => pack.featured);
      }
      // Try API first, fallback to mock data
      try {
        const response = await fetch('/api/packs/featured');
        if (!response.ok) throw new Error('API not available');
        return await response.json();
      } catch {
        return mockMusicPacks.filter(pack => pack.featured);
      }
    },
    select: (data) => data || [],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Hook to fetch single music pack
export function useMusicPack(id: string) {
  return useQuery<MusicPack>({
    queryKey: ['/api/packs', id],
    queryFn: async () => {
      if (isStaticEnvironment()) {
        const pack = mockMusicPacks.find(p => p.id === id);
        if (!pack) throw new Error('Pack not found');
        return pack;
      }
      // Try API first, fallback to mock data
      try {
        const response = await fetch(`/api/packs/${id}`);
        if (!response.ok) throw new Error('API not available');
        return await response.json();
      } catch {
        const pack = mockMusicPacks.find(p => p.id === id);
        if (!pack) throw new Error('Pack not found');
        return pack;
      }
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Function to download pack (using mutation would be overkill for a simple download)
export async function downloadMusicPack(packId: string) {
  try {
    if (isStaticEnvironment()) {
      // In static environment, show a message or redirect to contact
      alert('Para fazer download dos packs, entre em contato via WhatsApp!');
      return;
    }
    
    const response = await fetch(`/api/packs/${packId}/download`);
    
    if (!response.ok) {
      throw new Error('Download failed');
    }
    
    const data = await response.json();
    
    // Create a temporary link to trigger download
    const link = document.createElement('a');
    link.href = data.downloadUrl;
    link.download = data.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    return data;
  } catch (error) {
    console.error('Download error:', error);
    // In case of error, show contact message
    alert('Para fazer download dos packs, entre em contato via WhatsApp!');
    throw error;
  }
}