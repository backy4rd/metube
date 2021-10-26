import React, { useEffect, useState } from 'react';

import streamApi from '@api/streamApi';
import IStream from '@interfaces/IStream';
import ISkeleton, { isSkeleton } from '@interfaces/ISkeleton';
import generateSkeletons from '@utils/generateSkeleton';

import VerticalVideo from '@components/VerticalVideo';
import NotFound from '@components/NotFound';

import './Lives.css';

function Lives() {
  const [streams, setStreams] = useState<Array<IStream | ISkeleton>>(generateSkeletons(5));

  useEffect(() => {
    streamApi.getLiveStreams().then(setStreams);
  }, []);

  if (streams.length === 0) return <NotFound text="Không có luồng phát trực tiếp nào!" />;
  return (
    <div className="Lives App-VerticalVideoGrid">
      {streams.map((stream) => (
        <VerticalVideo key={isSkeleton(stream) ? stream.bone : stream.id} video={stream} />
      ))}
    </div>
  );
}

export default Lives;
