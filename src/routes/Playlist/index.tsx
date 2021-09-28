import React from 'react';
import { useParams } from 'react-router-dom';

import PlaylistVideos from '@components/PlaylistVideos';

import './Playlist.css';

function Playlist() {
  const { playlistId } = useParams<{ playlistId: string }>();

  return (
    <div className="Playlist">
      <div className="Playlist__Modify"></div>
      <PlaylistVideos playlistId={+playlistId} />
    </div>
  );
}

export default Playlist;
