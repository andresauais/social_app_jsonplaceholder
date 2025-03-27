import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { fetchUsers } from '../services/users';

const Home = () => {
  const { data: users, isLoading, error } = useQuery({
    queryKey: ['users'], // Clave única para identificar esta consulta
    queryFn: fetchUsers,
  });

	// Si la petición está cargando, muestra un mensaje de carga.
  if (isLoading) return <div className="container mt-4">Cargando usuarios...</div>;
	// Si ocurrió un error durante la petición, muestra un mensaje de error.
  if (error) return <div className="container mt-4">Ha ocurrido un error</div>;

  return (
    <div className="container mt-4">
      <h1>Listado de usuarios</h1>
      <ul className="list-group mt-3">
        {users.map((user: any) => (
          <li key={user.id} className="list-group-item">
            <Link to={`/users/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
