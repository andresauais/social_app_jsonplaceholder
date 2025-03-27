import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import UserPage from '../pages/UserPage';

// Servicios
import { fetchUserById } from '../services/users';
import { fetchAlbumsByUser } from '../services/albums';
import { fetchPhotosByAlbum } from '../services/photos';
import {
  fetchTodosByUser
} from '../services/todos';

// Mocks de todos los servicios necesarios
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

// Tipado explícito
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

describe('UserPage Component', () => {
  test('renders loading state initially', async () => {
    // Estructura válida aunque esté vacía
    mockFetchUserById.mockResolvedValueOnce({
      id: 1,
      name: '',
      username: '',
      email: '',
      address: { city: '' },
      website: '',
      company: { name: '' },
    });

    mockFetchAlbumsByUser.mockResolvedValueOnce([]);
    mockFetchPhotosByAlbum.mockResolvedValueOnce([]);
    mockFetchTodosByUser.mockResolvedValueOnce([]);

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/users/1']}>
          <Routes>
            <Route path="/users/:id" element={<UserPage />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );

    expect(await screen.findByText(/Cargando información/i)).toBeInTheDocument();
  });

  test('renders user details correctly', async () => {
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
        title: 'Foto 1',
        url: 'https://via.placeholder.com/600/92c952',
        thumbnailUrl: 'https://via.placeholder.com/150/92c952',
      },
    ]);

    mockFetchTodosByUser.mockResolvedValueOnce([
      { id: 1, userId: 1, title: 'Test TODO', completed: false },
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
      expect(screen.getByText('Leanne Graham')).toBeInTheDocument();
      expect(screen.getByText(/Bret/i)).toBeInTheDocument();
      expect(screen.getByText(/Sincere@april.biz/i)).toBeInTheDocument();
      expect(screen.getByText(/Gwenborough/i)).toBeInTheDocument();
      expect(screen.getByText(/hildegard.org/i)).toBeInTheDocument();
      expect(screen.getByText(/Romaguera-Crona/i)).toBeInTheDocument();
      expect(screen.getByText(/quidem molestiae enim/i)).toBeInTheDocument();
      expect(screen.getByText(/Test TODO/i)).toBeInTheDocument();
    });
  });
  
});
