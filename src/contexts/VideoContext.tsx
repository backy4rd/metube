import React from 'react';

import IVideo from '@interfaces/IVideo';

const VideoContext = React.createContext<IVideo>({} as IVideo);

export function useVideo() {
  return React.useContext(VideoContext);
}

interface VideoProviderProps {
  video: IVideo;
  children: React.ReactNode;
}

export function VideoProvider(props: VideoProviderProps) {
  return <VideoContext.Provider value={props.video}>{props.children}</VideoContext.Provider>;
}
