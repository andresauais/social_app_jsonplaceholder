import { useEffect, useState } from 'react';
import { Album } from '../models/Album';

export function useRecentAlbums() {
  const [recentAlbums, setRecentAlbums] = useState<Album[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('recentAlbums');
    if (stored) {
      try {
        const parsed: Album[] = JSON.parse(stored);
        setRecentAlbums(parsed);
      } catch (e) {
        console.error('Error parsing recent albums from localStorage', e);
      }
    }
  }, []);

  return recentAlbums;
}
