import { api } from './api';

// Obtener la lista completa de usuarios
export const fetchUsers = async () => {
  const { data } = await api.get('/users');
  return data;
};

// Obtener un solo usuario por su ID
export const fetchUserById = async (id: string | number) => {
  const { data } = await api.get(`/users/${id}`);
  return data;
};
