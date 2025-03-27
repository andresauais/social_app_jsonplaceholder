import { api } from './api';
import { Todo } from '../models/Todo';

// Obtener todos del usuario por userId
export const fetchTodosByUser = async (userId: number): Promise<Todo[]> => {
  const { data } = await api.get<Todo[]>(`/todos?userId=${userId}`);
  return data;
};

// Añadir nuevo TODO
export const addTodo = async (todo: Omit<Todo, 'id'>): Promise<Todo> => {
  const { data } = await api.post<Todo>(`/todos`, todo);
  return data;
};

// Modificar TODO existente
export const updateTodo = async (id: number, updatedTodo: Partial<Todo>): Promise<Todo> => {
  const { data } = await api.put<Todo>(`/todos/${id}`, updatedTodo);
  return data;
};

// Eliminar TODO
export const deleteTodo = async (id: number): Promise<void> => {
  await api.delete(`/todos/${id}`);
};
