import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchTodosByUser, addTodo, updateTodo, deleteTodo } from '../services/todos';
import { Todo } from '../models/Todo';

export const useTodos = (userId: number) => {
  const queryClient = useQueryClient();

  // Obtener todos del usuario
  const { data: todos, isLoading } = useQuery<Todo[]>({
    queryKey: ['todos', userId],
    queryFn: () => fetchTodosByUser(userId),
  });

  const [newTodo, setNewTodo] = useState('');

  // Añadir todo (validando sin números)
  const addMutation = useMutation({
    mutationFn: addTodo,
    //setQueryData para actualizar localmente la caché en lugar de invalidarla cada vez así evitar recargas
    onSuccess: (newItem) => {
      queryClient.setQueryData<Todo[]>(['todos', userId], (oldTodos = []) => [
        ...oldTodos,
        newItem,
      ]);
    },
  });

  const handleAddTodo = () => {
    if (/\d/.test(newTodo)) {
      alert('El TODO no puede contener números.');
      return;
    }
    addMutation.mutate({ userId, title: newTodo, completed: false });
    setNewTodo('');
  };

  // Modificar estado de completado de un todo
  const updateMutation = useMutation({
    mutationFn: ({ id, completed }: { id: number; completed: boolean }) =>
      updateTodo(id, { completed }),
    //setQueryData para actualizar localmente la caché en lugar de invalidarla cada vez así evitar recargas
    onSuccess: (_, { id, completed }) => {
      queryClient.setQueryData<Todo[]>(['todos', userId], (oldTodos = []) =>
        oldTodos.map((todo) => (todo.id === id ? { ...todo, completed } : todo))
      );
    },
  });

  const handleToggleTodo = (id: number, completed: boolean) => {
    updateMutation.mutate({ id, completed: !completed });
  };

  // Eliminar todo
  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    //setQueryData para actualizar localmente la caché en lugar de invalidarla cada vez así evitar recargas
    onSuccess: (_, id) => {
      queryClient.setQueryData<Todo[]>(['todos', userId], (oldTodos = []) =>
        oldTodos.filter((todo) => todo.id !== id)
      );
    },
  });

  const handleDeleteTodo = (id: number) => {
    deleteMutation.mutate(id);
  };

  return {
    todos,
    isLoading,
    newTodo,
    setNewTodo,
    handleAddTodo,
    handleToggleTodo,
    handleDeleteTodo,
  };
};
