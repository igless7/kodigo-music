// src/components/AlbumList.jsx
import { Card, Row, Col } from 'react-bootstrap';

export default function AlbumList({ items }) {
  if (!items || items.length === 0) return <p>No se encontraron álbumes.</p>;

  return (
    <Row xs={1} md={3} className="g-4">
      {items.map(album => (
        <Col key={album.id}>
          <Card>
            <Card.Img variant="top" src={album.images[0]?.url} alt={album.name} />
            <Card.Body>
              <Card.Title>{album.name}</Card.Title>
              <Card.Text>{album.artists[0]?.name}</Card.Text>
              <a
                href={album.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
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

//export default AlbumList;
