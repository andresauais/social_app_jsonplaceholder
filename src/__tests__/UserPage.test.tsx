import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import UserPage from '../pages/UserPage';
import { fetchUserById } from '../services/users';

// Mock del servicio que obtiene un usuario
vi.mock('../services/users', () => ({
  fetchUserById: vi.fn(),
}));

let queryClient: QueryClient;

// Crear nuevo QueryClient antes de cada test para aislar la caché
beforeEach(() => {
  queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        cacheTime: 0,
      },
    },
  });
});

describe('UserPage Component', () => {
  test('renders loading state initially', () => {
    (fetchUserById as ReturnType<typeof vi.fn>).mockResolvedValueOnce({});

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/users/1']}>
          <Routes>
            <Route path="/users/:id" element={<UserPage />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );

    expect(screen.getByText(/Cargando usuario/i)).toBeInTheDocument();
  });

  test('renders user details correctly', async () => {
    (fetchUserById as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      id: 1,
      name: 'Leanne Graham',
      username: 'Bret',
      email: 'Sincere@april.biz',
      address: { city: 'Gwenborough' },
      website: 'hildegard.org',
      company: { name: 'Romaguera-Crona' },
    });

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
    });
  });

  test('renders error message if fetching fails', async () => {
    (fetchUserById as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new Error('API Error'));

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
      expect(screen.getByText(/Error al cargar el usuario/i)).toBeInTheDocument();
    });
  });
});
