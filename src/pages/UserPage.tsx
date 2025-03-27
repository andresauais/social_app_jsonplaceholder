import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchUserById } from '../services/users';

const UserPage = () => {
  // Obtiene el ID del usuario desde la ruta
  const { id } = useParams();

  const { data: user, isLoading, error } = useQuery({
    queryKey: ['user', id],
    queryFn: () => fetchUserById(id!),
    enabled: !!id, // nos aseguramos que la consulta se realice solo si existe el id
  });

  // Manejo de estados: carga y error
  if (isLoading) return <div className="container mt-4">Cargando usuario...</div>;
  if (error || !user) return <div className="container mt-4">Error al cargar el usuario.</div>;

  // Renderiza la información detallada del usuario obtenido
  return (
    <div className="container mt-4">
      <h1>{user.name}</h1>
      <ul className="list-group mt-3">
        <li className="list-group-item"><strong>Username:</strong> {user.username}</li>
        <li className="list-group-item"><strong>Email:</strong> {user.email}</li>
        <li className="list-group-item"><strong>Ciudad:</strong> {user.address.city}</li>
        <li className="list-group-item"><strong>Website:</strong> {user.website}</li>
        <li className="list-group-item"><strong>Empresa:</strong> {user.company.name}</li>
      </ul>
    </div>
  );
};

export default UserPage;
