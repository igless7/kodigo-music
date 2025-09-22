import { Container } from 'react-bootstrap';
import useSpotify from '../hooks/useSpotify';
import SongList from '../components/SongList';
import ArtistList from '../components/ArtistList';
import PlaylistList from '../components/PlaylistList';

function Home() {
  // 🔹 Canciones populares (ejemplo: playlist Top 50 Global)
  const {
    data: topTracks,
    loading: tracksLoading,
    error: tracksError
  } = useSpotify('/playlists/37i9dQZEVXbNG2KDcFcKOF/tracks?limit=10');

  // 🔹 Listas destacadas (curadas por Spotify)
  const {
    data: featuredPlaylists,
    loading: playlistsLoading,
    error: playlistsError
  } = useSpotify('/browse/featured-playlists?limit=10');

  // 🔹 Artistas populares (IDs de ejemplo)
  const {
    data: topArtists,
    loading: artistsLoading,
    error: artistsError
  } = useSpotify('/artists?ids=0OdUWJ0sBjDrqHygGUXeCF,0oSGxfWSnnOXhD2fKuz2Gy,3dBVyJ7JuOMt4GE9607Qin');

  return (
    <Container className="mt-5 pt-4">
      <h1 className="mb-4">Bienvenido a SpotifyApp</h1>

      <SongList
        songs={topTracks}
        loading={tracksLoading}
        error={tracksError}
      />

      <ArtistList
        artists={topArtists}
        loading={artistsLoading}
        error={artistsError}
      />

      <PlaylistList
        playlists={featuredPlaylists}
        loading={playlistsLoading}
        error={playlistsError}
      />
    </Container>
  );
}

export default Home;
