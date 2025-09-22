// src/components/ArtistList.jsx
import { Card, Row, Col, Badge } from 'react-bootstrap';

export default function ArtistList({ items }) {
  if (!items || items.length === 0) return <p>No se encontraron artistas.</p>;

  return (
    <Row xs={1} md={3} lg={4} className="g-4">
      {items.map(artist => (
        <Col key={artist.id}>
          <Card className="h-100">
            <Card.Img
              variant="top"
              src={artist.images[0]?.url}
              alt={artist.name}
              style={{ objectFit: 'cover', height: '250px' }}
            />
            <Card.Body>
              <Card.Title>{artist.name}</Card.Title>

              {/* Géneros */}
              {artist.genres.length > 0 && (
                <div className="mb-2">
                  {artist.genres.map((genre, index) => (
                    <Badge bg="secondary" key={index} className="me-1">
                      {genre}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Popularidad y seguidores */}
              <Card.Text>
                Popularidad: <strong>{artist.popularity}</strong><br />
                Seguidores: <strong>{artist.followers?.total.toLocaleString()}</strong>
              </Card.Text>

              {/* Enlace a Spotify */}
              <a
                href={artist.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-success btn-sm"
              >
                Ver en Spotify
              </a>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
