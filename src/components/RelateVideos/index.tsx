import React, { useEffect, useState } from 'react';

import IVideo from '@interfaces/IVideo';
import videoApi from '@api/videoApi';

import HorizontalVideos from '@components/HorizontalVideos';

import './RelateVideos.css';

interface RelateVideosProps {
  video: IVideo;
}

function RelateVideos(props: RelateVideosProps) {
  const [videos, setVideos] = useState<Array<IVideo>>([]);

  useEffect(() => {
    videoApi.getRelateVideos(props.video.id).then(setVideos);
  }, [props.video.id]);

  return (
    <div className="RelateVideos">
      <HorizontalVideos videos={videos} />
    </div>
  );
}

export default RelateVideos;
