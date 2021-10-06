import React, { useEffect, useState } from 'react';

import streamApi from '@api/streamApi';
import IStream from '@interfaces/IStream';

import VerticalVideo from '@components/VerticalVideo';

import './Lives.css';

function Lives() {
  const [streams, setStreams] = useState<Array<IStream>>([]);

  useEffect(() => {
    streamApi.getLiveStreams().then(setStreams);
  }, []);

  return (
    <div className="Lives App-VerticalVideoGrid">
      {streams.map((stream) => (
        <VerticalVideo key={stream.id} video={stream} />
      ))}
    </div>
  );
}

export default Lives;
