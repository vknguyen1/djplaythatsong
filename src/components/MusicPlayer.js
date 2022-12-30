import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SongList from './Songlist';

const API_URL = 'https://api.spotify.com/v1/search';

function MusicPlayer({
  currentSong,
  selectSong,
  availableSongs,
  token,
  tempo,
  songKey,
  relatedArtists,
}) {
  const [player, setPlayer] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    window.onSpotifyWebPlaybackSDKReady = () => {
      setPlayer(window.Spotify.Player);
    };
  }, []);

  useEffect(() => {
    if (currentSong && player) {
      player.queueURI(`spotify:track:${currentSong.id}`);
      player.play();
      player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
      });
      player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
      });
      player.addListener('authentication_error', ({ message }) => {
        console.log('Authentication error occurred:', message);
      });
    }
  }, [currentSong, player]);

  const searchSongs = async (e) => {
    e.preventDefault();
    const { data } = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: searchQuery,
        type: 'track',
      },
    });
    setSearchResults(data.tracks.items);
  };

  return (
    <div>
      <form onSubmit={searchSongs}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <SongList songs={searchResults} selectSong={selectSong} />
      {player && (
        <div>
          <button onClick={() => player.prevTrack()}>Previous</button>
          <button onClick={() => player.togglePlay()}>Play/Pause</button>
          <button onClick={() => player.nextTrack()}>Next</button>
        </div>
      )}

      <div className="spotify_player">
        {currentSong ? (
          <iframe
            src={`https://open.spotify.com/embed/track/${currentSong.id}`}
            width="100%"
            height="380"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          ></iframe>
        ) : (
          <div>No song selected</div>
        )}
      </div>
      <div>
        {currentSong && (
          <div>
            <p>Current Song: {currentSong.name}</p>
            <p>Tempo: {tempo}</p>
            <p>Key: {songKey}</p>
            <p>Related Artists:</p>
            <ul>
              {relatedArtists.map((artist) => (
                <li key={artist.id}>{artist.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default MusicPlayer;
