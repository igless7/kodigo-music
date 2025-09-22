// src/components/SongList.jsx
import { Card, Row, Col } from 'react-bootstrap';

export default function SongList({ items }) {
  if (!items || items.length === 0) return <p>No se encontraron canciones.</p>;

  return (
    <Row xs={1} md={3} className="g-4">
      {items.map(song => (
        <Col key={song.id}>
          <Card>
            <Card.Img variant="top" src={song.album?.images[0]?.url} alt={song.name} />
            <Card.Body>
              <Card.Title>{song.name}</Card.Title>
              <Card.Text>{song.artists.map(a => a.name).join(', ')}</Card.Text>
              <a href={song.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                Escuchar en Spotify
              </a>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

//export default SongList;
