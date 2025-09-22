// src/components/PlaylistList.jsx
import { Card, Row, Col } from 'react-bootstrap';

export default function PlaylistList({ items }) {
  if (!items || items.length === 0) return <p>No se encontraron playlists.</p>;

  // Filtramos valores nulos
  const validPlaylists = items.filter(p => p !== null);

  return (
    <Row xs={1} md={3} lg={4} className="g-4">
      {validPlaylists.map(playlist => (
        <Col key={playlist.id}>
          <Card className="h-100">
            <Card.Img
              variant="top"
              src={playlist.images[0]?.url}
              alt={playlist.name}
              style={{ objectFit: 'cover', height: '250px' }}
            />
            <Card.Body>
              <Card.Title>{playlist.name}</Card.Title>

              {/* Descripción */}
              {playlist.description && (
                <Card.Text className="text-muted" style={{ fontSize: '0.9rem' }}>
                  {playlist.description}
                </Card.Text>
              )}

              {/* Creador y cantidad de canciones */}
              <Card.Text>
                Creado por: <strong>{playlist.owner?.display_name || 'Desconocido'}</strong><br />
                Canciones: <strong>{playlist.tracks?.total}</strong>
              </Card.Text>

              {/* Enlace a Spotify */}
              <a
                href={playlist.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-success btn-sm"
              >
                Abrir en Spotify
              </a>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
