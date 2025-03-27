import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Album } from '../models/Album';
import { Photo } from '../models/Photo';

//Propiedades del componente AlbumCard
interface AlbumCardProps {
  album: Album;
  fetchThumbnail: (albumId: number) => Promise<Photo | null>;
}

const AlbumCard = ({ album, fetchThumbnail }: AlbumCardProps) => {
  const [thumbnail, setThumbnail] = useState<Photo | null>(null);

  useEffect(() => {
    // Cargar miniatura del álbum
    fetchThumbnail(album.id).then(setThumbnail);
  }, [album.id, fetchThumbnail]);

  return (
    <div className="col-md-3 mb-4">
      <div className="card">
        {thumbnail && (
          <img
            src={thumbnail.thumbnailUrl}
            className="card-img-top"
            alt={thumbnail.title}
          />
        )}
        <div className="card-body">
          <h5 className="card-title">{album.title}</h5>
          <Link to={`/albums/${album.id}`} className="btn btn-primary">
            Ver álbum
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AlbumCard;
