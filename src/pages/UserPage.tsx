import { useParams } from 'react-router-dom';

const UserPage = () => {
  const { id } = useParams();

  return (
    <div className="container mt-4">
      <h1>Página detalle del usuario con ID: {id}</h1>
    </div>
  );
};

export default UserPage;
