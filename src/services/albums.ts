import { Album } from '../models/Album';
import { Photo } from '../models/Photo';
import { api } from './api';

// Obtener álbumes por ID de usuario
export const fetchAlbumsByUser = async (userId: number): Promise<Album[]> => {
  const { data } = await api.get<Album[]>(`/users/${userId}/albums`);
  return data;
};

export const fetchAlbumById = async (albumId: number): Promise<Album> => {
  const { data } = await api.get<Album>(`/albums/${albumId}`);
  return data;
};

export const fetchPhotosByAlbumId = async (albumId: number): Promise<Photo[]> => {
  const { data } = await api.get<Photo[]>(`/albums/${albumId}/photos`);
  return data;
};