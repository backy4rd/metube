import React from 'react';

import IStream from '@interfaces/IStream';

import StreamPlayerSkeleton from './StreamPlayerSkeleton';

import './StreamPlayer.css';

interface StreamPlayerProps {
  stream: IStream | null;
}

function StreamPlayer({ stream }: StreamPlayerProps) {
  return <StreamPlayerSkeleton />;
  /* return <div className={`StreamPlayer ${className || ''}`}></div>; */
}

export default StreamPlayer;
