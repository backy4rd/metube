import React, { useEffect, useState } from 'react';

import { useSetLoading } from '@contexts/LoadingContext';
import IVideo from '@interfaces/IVideo';
import videoApi from '@api/videoApi';

import HorizontalVideos from '@components/HorizontalVideos';

import './Liked.css';

function Liked() {
  const [videos, setVideos] = useState<Array<IVideo>>([]);

  const setLoading = useSetLoading();

  useEffect(() => {
    setLoading(true);
    videoApi
      .getLikedVideos()
      .then(setVideos)
      .finally(() => setLoading(false));
  }, [setLoading]);

  return (
    <div className="Search">
      <HorizontalVideos videos={videos} extend />
    </div>
  );
}

export default Liked;
