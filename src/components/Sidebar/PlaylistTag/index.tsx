import React from 'react';
import { PlaylistPlayRounded } from '@material-ui/icons';

import IPlaylist from '@interfaces/IPlaylist';

import './PlaylistTag.css';

interface PlaylistTagProps {
  playlist: IPlaylist;
}

function PlaylistTag({ playlist }: PlaylistTagProps) {
  return (
    <div className="PlaylistTag">
      <PlaylistPlayRounded />
      <div className="PlaylistTag-Name">{playlist.name}</div>
    </div>
  );
}

export default PlaylistTag;
