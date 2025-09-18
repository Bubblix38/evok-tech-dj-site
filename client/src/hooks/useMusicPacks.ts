import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { type MusicPack } from "@shared/schema";

// Hook to fetch all music packs
export function useMusicPacks() {
  return useQuery<MusicPack[]>({
    queryKey: ['/api/packs'],
    select: (data) => data || [],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Hook to fetch featured music packs
export function useFeaturedPacks() {
  return useQuery<MusicPack[]>({
    queryKey: ['/api/packs/featured'],
    select: (data) => data || [],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Hook to fetch single music pack
export function useMusicPack(id: string) {
  return useQuery<MusicPack>({
    queryKey: ['/api/packs', id],
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Function to download pack (using mutation would be overkill for a simple download)
export async function downloadMusicPack(packId: string) {
  try {
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
    throw error;
  }
}