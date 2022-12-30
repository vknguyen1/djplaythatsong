import React from 'react';

function SongList({ songs, selectSong }) {
  return (
    <div className="songlist">
      <ul>
        {songs.map((song) => (
          <li key={song.id} onClick={() => selectSong(song)}>
            {song.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SongList;
