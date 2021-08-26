import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { useParams } from 'react-router-dom';

import videoApi from '@api/videoApi';
import IVideo from '@interfaces/IVideo';

import './Player.css';

/* interface PlayerProps { */
/*   videoUrl: string; */
/* } */

function Player() {
  const [video, setVideo] = useState<IVideo | null>(null);
  const { id: videoId } = useParams<{ id: string }>();

  useEffect(() => {
    videoApi.getVideo(videoId).then(setVideo);
  }, [videoId]);

  if (video === null) return null;

  return (
    <div className="Player">
      <ReactPlayer url={video.videoPath} controls width="100%"></ReactPlayer>
    </div>
  );
}

export default Player;
