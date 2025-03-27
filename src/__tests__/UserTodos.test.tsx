import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import UserTodos from '../components/UserTodos';
import * as todosService from '../services/todos';
import { Todo } from '../models/Todo';

// Mock data
const mockTodos: Todo[] = [
  { id: 1, userId: 1, title: 'Estudiar React', completed: false },
  { id: 2, userId: 1, title: 'Hacer test', completed: true },
];

// Mockear los servicios
vi.mock('../services/todos');

const mockFetchTodosByUser = todosService.fetchTodosByUser as unknown as ReturnType<typeof vi.fn>;
const mockAddTodo = todosService.addTodo as unknown as ReturnType<typeof vi.fn>;
const mockUpdateTodo = todosService.updateTodo as unknown as ReturnType<typeof vi.fn>;
const mockDeleteTodo = todosService.deleteTodo as unknown as ReturnType<typeof vi.fn>;

let queryClient: QueryClient;

beforeEach(() => {
  queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  mockFetchTodosByUser.mockResolvedValue(mockTodos);
  mockAddTodo.mockImplementation((todo) =>
    Promise.resolve({ ...todo, id: Math.floor(Math.random() * 1000) })
  );
  mockUpdateTodo.mockImplementation((id, data) =>
    Promise.resolve({ id, userId: 1, title: 'Estudiar React', completed: data.completed ?? false })
  );
  mockDeleteTodo.mockResolvedValue(undefined);
});

describe('UserTodos component', () => {
  test('muestra la lista de TODOs del usuario', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <UserTodos userId={1} />
        </MemoryRouter>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Estudiar React')).toBeInTheDocument();
      expect(screen.getByText('Hacer test')).toBeInTheDocument();
    });
  });

  test('bloquea TODOs con números en el input', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <UserTodos userId={1} />
        </MemoryRouter>
      </QueryClientProvider>
    );
  
    const input = await screen.findByPlaceholderText(/añadir nuevo todo/i);
    const addButton = await screen.findByRole('button', { name: /añadir/i });
  
    window.alert = vi.fn();
  
    fireEvent.change(input, { target: { value: 'No válido 123' } });
  
    // Asegurarse de que el input se haya actualizado antes de hacer click
    await waitFor(() => {
      expect(input).toHaveValue('No válido 123');
    });
  
    fireEvent.click(addButton);
  
    expect(window.alert).toHaveBeenCalledWith('El TODO no puede contener números.');
    expect(mockAddTodo).not.toHaveBeenCalled();
  });
  
  

  test('bloquea TODOs con números en el input', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <UserTodos userId={1} />
        </MemoryRouter>
      </QueryClientProvider>
    );
  
    // Espera a que la UI haya cargado el input
    await waitFor(() => {
      expect(screen.getByPlaceholderText(/añadir nuevo todo/i)).toBeInTheDocument();
    });
  
    const input = screen.getByPlaceholderText(/añadir nuevo todo/i);
    const addButton = screen.getByRole('button', { name: /añadir/i });
  
    window.alert = vi.fn();
  
    fireEvent.change(input, { target: { value: 'No válido 123' } });
    fireEvent.click(addButton);
  
    expect(window.alert).toHaveBeenCalledWith('El TODO no puede contener números.');
    expect(mockAddTodo).not.toHaveBeenCalled();
  });
    
});
