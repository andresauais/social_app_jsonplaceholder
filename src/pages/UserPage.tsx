import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchUserById } from '../services/users';
import { fetchAlbumsByUser } from '../services/albums';
import { fetchPhotosByAlbum } from '../services/photos';
import { User } from '../models/User';
import { Photo } from '../models/Photo';
import { Album } from '../models/Album';
import AlbumCard from '../components/AlbumCard';
import UserTodos from '../components/UserTodos';

const UserPage = () => {
  const { id } = useParams();

  const { data: user, isLoading: loadingUser } = useQuery<User>({
    queryKey: ['user', id],
    queryFn: () => fetchUserById(id!),
    enabled: !!id,
  });

  const { data: albums, isLoading: loadingAlbums } = useQuery<Album[]>({
    queryKey: ['albums', id],
    queryFn: () => fetchAlbumsByUser(Number(id)),
    enabled: !!id,
  });

  const fetchThumbnail = async (albumId: number): Promise<Photo | null> => {
    const photos = await fetchPhotosByAlbum(albumId);
    return photos.length > 0 ? photos[0] : null;
  };

  if (loadingUser || loadingAlbums) return <div className="container mt-4">Cargando información...</div>;

  return (
    <div className="container mt-4">
      <h1>{user?.name}</h1>
      <ul className="list-group mt-3">
        <li className="list-group-item"><strong>Username:</strong> {user?.username}</li>
        <li className="list-group-item"><strong>Email:</strong> {user?.email}</li>
        <li className="list-group-item"><strong>Ciudad:</strong> {user?.address.city}</li>
        <li className="list-group-item"><strong>Website:</strong> {user?.website}</li>
        <li className="list-group-item"><strong>Empresa:</strong> {user?.company.name}</li>
      </ul>

      <h3 className="mt-5">Álbumes:</h3>
      <div className="row">
        {albums?.map((album) => (
          <AlbumCard key={album.id} album={album} fetchThumbnail={fetchThumbnail} />
        ))}
        <UserTodos userId={Number(id)} />
      </div>
    </div>
  );
};

export default UserPage;
