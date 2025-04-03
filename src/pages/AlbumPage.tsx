// src/pages/Album.tsx
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useAlbum } from '../hooks/useAlbum';

const Album = () => {
  const { id } = useParams<{ id: string }>();
  const albumId = Number(id);
  const { album, photos, isLoading } = useAlbum(albumId);

  // ✅ Guardar en localStorage como álbum recientemente visitado
  useEffect(() => {
    if (album) {
      const stored = localStorage.getItem('recentAlbums');
      let current: typeof album[] = [];

      if (stored) {
        try {
          current = JSON.parse(stored);
        } catch (e) {
          console.error('Error parsing recentAlbums', e);
        }
      }

      // Evitar duplicados
      const filtered = current.filter((a) => a.id !== album.id);

      const updated = [album, ...filtered].slice(0, 5); // máximo 5 álbumes recientes
      localStorage.setItem('recentAlbums', JSON.stringify(updated));
    }
  }, [album]);

  return (
    <div className="container mt-5">
      <h1>Álbum {albumId}</h1>

      {/* resto del contenido */}
      {isLoading ? (
        <p>Cargando fotos...</p>
      ) : (
        <div className="row mt-4">
          {photos?.map((photo) => (
            <div key={photo.id} className="col-md-3 mb-4">
              <div className="card">
                <img
                  src={photo.thumbnailUrl}
                  alt={photo.title}
                  className="card-img-top"
                />
                <div className="card-body">
                  <p className="card-text">{photo.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Album;
