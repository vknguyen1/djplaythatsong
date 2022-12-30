import React, { useState, useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import MusicPlayer from './components/MusicPlayer';
import SongList from './components/Songlist';
import Header from './components/Header';
import Footer from './components/Footer';
import { getToken, authorize } from './utils/auth';

const spotifyApi = new SpotifyWebApi();

function App() {
  const [currentSong, setCurrentSong] = useState(null);
  const [recommendedSongs, setRecommendedSongs] = useState([]);
  const [tempo, setTempo] = useState(null);
  const [songKey, setSongKey] = useState(null);
  const [relatedArtists, setRelatedArtists] = useState([]);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code');
    if (code) {
      getToken(code).then((token) => {
        window.history.replaceState({}, document.title, '/');
        setToken(token);
      });
    }
  }, []);

  if (!token) {
    return <button onClick={authorize}>Authorize</button>;
  }

  const selectSong = (song) => {
    setCurrentSong(song);
    spotifyApi.setAccessToken(token);
    spotifyApi.getAudioFeaturesForTrack(song.id).then((features) => {
      setTempo(features.tempo);
      setSongKey(features.key);
    });
    spotifyApi.getArtistRelatedArtists(song.artists[0].id).then((artists) => {
      setRelatedArtists(artists.artists);
    });
    spotifyApi
      .searchTracks(`key:${songKey} tempo:${tempo}`, { limit: 50 })
      .then((results) => {
        setRecommendedSongs(results.tracks.items);
      });
  };

  return (
    <div>
      <Header />
      <MusicPlayer
        currentSong={currentSong}
        selectSong={selectSong}
        token={token}
        tempo={tempo}
        songKey={songKey}
        relatedArtists={relatedArtists}
      />
      <SongList songs={recommendedSongs} selectSong={selectSong} />
      <Footer />
    </div>
  );
}

export default App;
