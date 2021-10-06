import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import IStream from '@interfaces/IStream';
import generateSkeletons from '@utils/generateSkeleton';
import userApi from '@api/userApi';

import VerticalVideo from '@components/VerticalVideo';

import './ChannelStream.css';

function ChannelStream() {
  const [stream, setStream] = useState<IStream | null>(null);
  const { username } = useParams<{ username: string }>();

  useEffect(() => {
    userApi.getUserStream(username).then(setStream);
  }, [username]);

  return (
    <div className="ChannelStream App-VerticalVideoGrid">
      <VerticalVideo video={stream || generateSkeletons(1)[0]} />
    </div>
  );
}

export default ChannelStream;
