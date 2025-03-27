import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import UserPage from '../pages/UserPage';

import { fetchUserById } from '../services/users';
import { fetchAlbumsByUser } from '../services/albums';
import { fetchPhotosByAlbum } from '../services/photos';
import { fetchTodosByUser } from '../services/todos';

// Mocks
vi.mock('../services/users', () => ({
  fetchUserById: vi.fn(),
}));
vi.mock('../services/albums', () => ({
  fetchAlbumsByUser: vi.fn(),
}));
vi.mock('../services/photos', () => ({
  fetchPhotosByAlbum: vi.fn(),
}));
vi.mock('../services/todos', () => ({
  fetchTodosByUser: vi.fn(),
  addTodo: vi.fn(),
  updateTodo: vi.fn(),
  deleteTodo: vi.fn(),
}));

const mockFetchUserById = fetchUserById as ReturnType<typeof vi.fn>;
const mockFetchAlbumsByUser = fetchAlbumsByUser as ReturnType<typeof vi.fn>;
const mockFetchPhotosByAlbum = fetchPhotosByAlbum as ReturnType<typeof vi.fn>;
const mockFetchTodosByUser = fetchTodosByUser as ReturnType<typeof vi.fn>;

let queryClient: QueryClient;

beforeEach(() => {
  vi.clearAllMocks();

  queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });
});

describe('UserPage integration test', () => {
  test('renderiza info de usuario, álbumes y TODOs correctamente', async () => {
    mockFetchUserById.mockResolvedValueOnce({
      id: 1,
      name: 'Leanne Graham',
      username: 'Bret',
      email: 'Sincere@april.biz',
      address: { city: 'Gwenborough' },
      website: 'hildegard.org',
      company: { name: 'Romaguera-Crona' },
    });

    mockFetchAlbumsByUser.mockResolvedValueOnce([
      { id: 1, userId: 1, title: 'quidem molestiae enim' },
    ]);

    mockFetchPhotosByAlbum.mockResolvedValueOnce([
      {
        albumId: 1,
        id: 1,
        title: 'foto 1',
        url: 'https://via.placeholder.com/600/92c952',
        thumbnailUrl: 'https://via.placeholder.com/150/92c952',
      },
    ]);

    mockFetchTodosByUser.mockResolvedValueOnce([
      { id: 1, userId: 1, title: 'Estudiar React', completed: false },
      { id: 2, userId: 1, title: 'Hacer tests', completed: true },
    ]);

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/users/1']}>
          <Routes>
            <Route path="/users/:id" element={<UserPage />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );

    await waitFor(() => {
      // Info de usuario
      expect(screen.getByText('Leanne Graham')).toBeInTheDocument();
      expect(screen.getByText(/Bret/i)).toBeInTheDocument();
      expect(screen.getByText(/Sincere@april.biz/i)).toBeInTheDocument();
      expect(screen.getByText(/Gwenborough/i)).toBeInTheDocument();
      expect(screen.getByText(/hildegard.org/i)).toBeInTheDocument();
      expect(screen.getByText(/Romaguera-Crona/i)).toBeInTheDocument();

      // Álbumes
      expect(screen.getByText(/quidem molestiae enim/i)).toBeInTheDocument();

      // TODOs
      expect(screen.getByText(/Estudiar React/i)).toBeInTheDocument();
      expect(screen.getByText(/Hacer tests/i)).toBeInTheDocument();
    });
  });
});
