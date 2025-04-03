import { useQuery } from '@tanstack/react-query';
import { fetchAlbumById, fetchPhotosByAlbumId } from '../services/albums';
import { Album } from '../models/Album';
import { Photo } from '../models/Photo';

export const useAlbum = (albumId: number) => {
  const {
    data: album,
    isLoading: isLoadingAlbum,
    error: albumError,
  } = useQuery<Album>({
    queryKey: ['album', albumId],
    queryFn: () => fetchAlbumById(albumId),
  });

  const {
    data: photos,
    isLoading: isLoadingPhotos,
    error: photosError,
  } = useQuery<Photo[]>({
    queryKey: ['photos', albumId],
    queryFn: () => fetchPhotosByAlbumId(albumId),
  });

  return {
    album,
    photos,
    isLoading: isLoadingAlbum || isLoadingPhotos,
    error: albumError || photosError,
  };
};
