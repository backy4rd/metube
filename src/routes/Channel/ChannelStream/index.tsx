import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import IStream from '@interfaces/IStream';
import generateSkeletons from '@utils/generateSkeleton';
import userApi from '@api/userApi';
import { useAuth } from '@contexts/AuthContext';

import VerticalVideo from '@components/VerticalVideo';

import './ChannelStream.css';

function ChannelStream() {
  const [stream, setStream] = useState<IStream | null>(null);
  const { username } = useParams<{ username: string }>();

  const { user } = useAuth();

  useEffect(() => {
    if (user === undefined) return;
    userApi.getUserStream(user?.username === username ? 'me' : username).then(setStream);
  }, [username, user]);

  return (
    <div className="ChannelStream App-VerticalVideoGrid">
      <VerticalVideo video={stream || generateSkeletons(1)[0]} />
      <div>
        {stream?.id}?key={stream?.streamKey}
      </div>
    </div>
  );
}

export default ChannelStream;
