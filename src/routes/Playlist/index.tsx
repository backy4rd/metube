import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import IVideo from '@interfaces/IVideo';
import playlistApi from '@api/playlistApi';

import './Playlist.css';
import HorizontalVideos from '@components/HorizontalVideos';

function Playlist() {
  const [videos, setVideos] = useState<Array<IVideo>>([]);
  const { id: playlistId } = useParams<{ id: string }>();

  useEffect(() => {
    playlistApi.getPlaylistVideos(playlistId).then(setVideos);
  }, [playlistId]);

  return (
    <div className="Playlist">
      <HorizontalVideos videos={videos} />
    </div>
  );
}

export default Playlist;
