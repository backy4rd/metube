import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import IPlaylist from '@interfaces/IPlaylist';
import playlistApi from '@api/playlistApi';

import './Playlists.css';

function Playlists() {
  const [playlists, setPlaylists] = useState<Array<IPlaylist>>([]);

  useEffect(() => {
    playlistApi.getPlaylists().then(setPlaylists);
  }, []);

  return (
    <div className="Playlists">
      {playlists.map((playlist) => (
        <div key={playlist.id}>
          <Link to={`/playlist/${playlist.id}`}>{playlist.name}</Link>
        </div>
      ))}
    </div>
  );
}

export default Playlists;
