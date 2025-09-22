import { useState, useEffect } from 'react';
import axios from 'axios';
import { getAccessToken } from '../services/spotifyAPI';

const SPOTIFY_API = 'https://api.spotify.com/v1';


const useSpotify = (endpoint) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token    = await getAccessToken();
        const response = await axios.get(`${SPOTIFY_API}${endpoint}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setData(response.data);
        console.log(response.data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, loading, error };
};

export default useSpotify;