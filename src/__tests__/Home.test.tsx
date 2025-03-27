import { describe, test, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from '../pages/Home';

// Crea cliente de React Query para testing
const queryClient = new QueryClient();

describe('Home Page', () => {
  test('renders loading state initially', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </QueryClientProvider>
    );

    expect(screen.getByText(/Cargando usuarios/i)).toBeInTheDocument();
  });

  test('renders user list correctly', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Leanne Graham')).toBeInTheDocument(); // Usuario real desde la API proporcionada
    });
  });
});
