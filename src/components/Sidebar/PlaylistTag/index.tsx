import React from 'react';
import { Link } from 'react-router-dom';
import { PlaylistPlayRounded } from '@material-ui/icons';

import IPlaylist from '@interfaces/IPlaylist';

import './PlaylistTag.css';

interface PlaylistTagProps {
  playlist: IPlaylist;
}

function PlaylistTag({ playlist }: PlaylistTagProps) {
  return (
    <Link to={`/playlist/${playlist.id}`}>
      <div className="PlaylistTag">
        <PlaylistPlayRounded />
        <div className="PlaylistTag-Name">{playlist.name}</div>
      </div>
    </Link>
  );
}

export default PlaylistTag;
