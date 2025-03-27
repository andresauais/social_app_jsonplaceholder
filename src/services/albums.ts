import { Album } from '../models/Album';
import { api } from './api';

// Obtener álbumes por ID de usuario
export const fetchAlbumsByUser = async (userId: number): Promise<Album[]> => {
  const { data } = await api.get<Album[]>(`/users/${userId}/albums`);
  return data;
};
