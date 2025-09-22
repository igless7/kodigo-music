import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Container, Tabs, Tab, Spinner, Alert, Button } from 'react-bootstrap';
import useSpotify from '../hooks/useSpotify';
import SongList from '../components/SongList';
import ArtistList from '../components/ArtistList';
import AlbumList from '../components/AlbumList';
import PlaylistList from '../components/PlaylistList';
import { useEffect } from 'react';

export default function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate       = useNavigate();
  const query          = searchParams.get('q')    || '';
  const typeParam      = searchParams.get('type') || 'all';
  const [activeTab, setActiveTab] = useState(typeParam);

  useEffect(() => {
  setActiveTab(typeParam);
}, [typeParam]);

  // Definimos qué endpoint usar según la pestaña
  const endpoints = {
    all:      `/search?q=${query}&type=playlist%2Calbum%2Cartist%2Ctrack&limit=20`,
    track:    `/search?q=${query}&type=track&limit=20`,
    artist:   `/search?q=${query}&type=artist&limit=20`,
    album:    `/search?q=${query}&type=album&limit=20`,
    playlist: `/search?q=${query}&type=playlist&limit=20`
  };

  // El hook dispara la petición cada vez que cambia endpoints[activeTab]
  const { data, loading, error } = useSpotify(endpoints[activeTab]);

  // Cuando cambias de pestaña, actualizas el estado y la URL
  const handleTabSelect = tab => {
    setActiveTab(tab);
    setSearchParams({ q: query, type: tab });
  };

  if (!query) {
    return (
      <Container className="mt-5 pt-5">
        <Alert variant="info">Por favor ingresa algo para buscar.</Alert>
        <Button onClick={() => navigate('/')}>Volver</Button>
      </Container>
    );
  }

  return (
    <Container className="mt-5 pt-3">
      <h2>Resultados para “{query}”</h2>

      <Tabs activeKey={activeTab} onSelect={handleTabSelect} className="my-3">
        <Tab eventKey="all"      title="Todo" />
        <Tab eventKey="track"    title="Canciones" />
        <Tab eventKey="artist"   title="Artistas" />
        <Tab eventKey="album"    title="Álbumes" />
        <Tab eventKey="playlist" title="Playlists" />
      </Tabs>

      {loading && <Spinner animation="border" />}
      {error   && <Alert variant="danger">{error}</Alert>}

      {!loading && !error && data && (
        <>
          {activeTab === 'track'    && <SongList     items={data.items || data.tracks?.items} />}
          {activeTab === 'artist'   && <ArtistList   items={data.items || data.artists?.items} />}
          {activeTab === 'playlist' && <PlaylistList items={data.items || data.playlists?.items} />}
          {activeTab === 'album'    && <AlbumList    items={data.items || data.albums?.items} />}
          {activeTab === 'all' && (
  <>
    {data.tracks?.items && <SongList     items={data.tracks.items} />}
    {data.artists?.items && <ArtistList   items={data.artists.items} />}
    {data.albums?.items && <AlbumList    items={data.albums.items} />}
    {data.playlists?.items && <PlaylistList items={data.playlists.items} />}
  </>
)}
        </>
      )}
    </Container>
  );
}
