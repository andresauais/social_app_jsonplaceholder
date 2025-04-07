import { useQuery } from '@tanstack/react-query';
import { fetchAlbumById, fetchPhotosByAlbumId } from '../services/albums';
import { Album } from '../models/Album';
import { Photo } from '../models/Photo';

export const useAlbum = (albumId: number) => {
  const {
    data: album,
    isLoading: isLoadingAlbum
  } = useQuery<Album>({
    queryKey: ['album', albumId],
    queryFn: () => fetchAlbumById(albumId),
  });

  const {
    data: photos,
    isLoading: isLoadingPhotos
  } = useQuery<Photo[]>({
    queryKey: ['photos', albumId],
    queryFn: () => fetchPhotosByAlbumId(albumId),
  });

  return {
    album,
    photos,
    isLoading: isLoadingAlbum || isLoadingPhotos
  };
};
