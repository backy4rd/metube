import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import IVideo from '@interfaces/IVideo';
import videoApi from '@api/videoApi';
/* import { useShowSidebar } from '@contexts/ShowSidebarContext'; */

import Player from '@components/Player';
import RelateVideos from '@components/RelateVideos';
import Comments from '@components/Comments';

import './Watch.css';

function Watch() {
  const [video, setVideo] = useState<IVideo | null>(null);
  const { id: videoId } = useParams<{ id: string }>();
  /* const [, setShowSidebar] = useShowSidebar(); */

  /* useEffect(() => { */
  /*   setShowSidebar(false); */
  /*   return () => setShowSidebar(true); */
  /*   // eslint-disable-next-line */
  /* }, []); */

  useEffect(() => {
    videoApi.getVideo(videoId).then(setVideo);
  }, [videoId]);

  if (!video) return null;

  return (
    <div className="Watch">
      <div className="Watch__Player">
        <Player videoUrl={video.videoPath} />
      </div>
      <div className="Watch__Orther">
        <div className="Watch__Orther__Left">
          <Comments />
        </div>
        <div className="Watch__Orther__Right">
          <RelateVideos video={video} />
        </div>
      </div>
    </div>
  );
}

export default Watch;
