
const SPOTIFY_API = 'https://api.spotify.com/v1';
const TOKEN_URL = 'https://accounts.spotify.com/api/token';
const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

let accessToken = null;
let tokenExpiresAt = 0;

export const getNewAccessToken = async () => {
    try {
        const res = await fetch(`${TOKEN_URL}`, {
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET),
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials'
        }
    )
        const { access_token, expires_in } = await res.json();
        //Guarda exactamnente cuando expira el token en el futuro
        tokenExpiresAt = Date.now() + expires_in * 1000;
        accessToken = access_token;    // guardamos para reusar
        return accessToken;
        
    } catch (error) {
        throw new Error('Error fetching token from Spotify API: ' + error.message);
    }

}

async function getAccessToken() {
  // Si no hay token o ha expirado, pedimos uno nuevo
  if (!accessToken || Date.now() >= tokenExpiresAt) {
    return await getNewAccessToken();
  }
  return accessToken;
}

//obtener artista
const getArtist = async (search) => {
    (accessToken === null) && (accessToken = await getAccessToken());
    const response = await fetch(`${SPOTIFY_API}/artists/search?q=${search}&type=artist`, {
        method:  'GET',
      headers: {
      'Content-Type':  'application/json',
      'Authorization':  'Bearer '  +  accessToken,
        }
    });
    const data = await response.artists.items.json();
    return data.map(artist  =>  ({
        id: artist.id,
        name: artist.name,
        spotifyUrl: artist.external_urls.spotify,
        img: artist,
        }
    ));
}

//obtener tracks
const getTracks = async (search) => {
    (accessToken === null) && (accessToken = await getAccessToken());
    search = encodeURIComponent(search);
    const response = await fetch(`${SPOTIFY_API}/search?q=${search}&type=track`, {
        method:  'GET',
      headers: {
      'Content-Type':  'application/json',
      'Authorization':  'Bearer '  +  accessToken,
    }});
    const data = await response.tracks.items.json();
    return data;
    // return data.map(track  =>  ({
    //     id: track.id,
    //     name: track.name,
    //     album: track.album.name,
    //     artist: track.artists[0].name,
    //     spotifyUrl: track.external_urls.spotify,
    //     img: track.album.images[0].url,
    //     }
    // ));
}

const getListOfCategories = async () => {
    (accessToken === null) && (accessToken = await getAccessToken());
    const response = await fetch(`${SPOTIFY_API}/browse/categories?locale=en`, {
        method:  'GET',
      headers: {
      'Content-Type':  'application/json',
      'Authorization':  'Bearer '  +  accessToken,
      }
    });
    const data = await response.json();
    return data;
}

export { getAccessToken};