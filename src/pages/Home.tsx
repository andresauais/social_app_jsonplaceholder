import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { fetchUsers } from '../services/users';
import { useRecentAlbums } from '../hooks/useRecentAlbums';

const Home = () => {
  const { data: users, isLoading, error } = useQuery({
    queryKey: ['users'], // Clave única para identificar esta consulta
    queryFn: fetchUsers,
  });

  const recentAlbums = useRecentAlbums();

	// Si la petición está cargando, muestra un mensaje de carga.
  if (isLoading) return <div className="container mt-4">Cargando usuarios...</div>;
	// Si ocurrió un error durante la petición, muestra un mensaje de error.
  if (error) return <div className="container mt-4">Ha ocurrido un error</div>;

  return (
    <div className="container mt-4">
      <h1>Listado de usuarios</h1>
      <ul className="list-group mt-3">
        {users?.map((user: any) => (
          <li key={user.id} className="list-group-item">
            <Link to={`/users/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
      {recentAlbums.length > 0 && (
        <div className="mt-5">
          <h3>Recién visitados:</h3>
          <ul className="list-group">
            {recentAlbums.map((album) => (
              <li key={album.id} className="list-group-item">
                <Link to={`/albums/${album.id}`}>
                  Álbum {album.id}: “{album.title}”
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Home;
