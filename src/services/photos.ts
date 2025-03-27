import { Photo } from '../models/Photo';
import { api } from './api';

// Obtener fotos por ID del álbum
export const fetchPhotosByAlbum = async (albumId: number): Promise<Photo[]> => {
  const { data } = await api.get<Photo[]>(`/albums/${albumId}/photos`);
  return data;
};
