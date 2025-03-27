import { api } from './api';
import { User } from '../models/User';

// Obtener la lista de usuarios
export const fetchUsers = async (): Promise<User[]> => {
  const { data } = await api.get<User[]>('/users');
  return data;
};

// Obtener un usuario por ID
export const fetchUserById = async (id: string | number): Promise<User> => {
  const { data } = await api.get<User>(`/users/${id}`);
  return data;
};
