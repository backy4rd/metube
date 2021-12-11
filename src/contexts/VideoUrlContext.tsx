import React, { useState } from 'react';

const VideoUrlContext = React.createContext<string>('');
const SetVideoUrlContext = React.createContext<React.Dispatch<React.SetStateAction<string>>>(
  () => {}
);

export function useVideoUrl() {
  return React.useContext(VideoUrlContext);
}

export function useSetVideoUrl() {
  return React.useContext(SetVideoUrlContext);
}

interface VideoUrlProviderProps {
  children: React.ReactNode;
  videoUrl: string;
}

export function VideoUrlProvider(props: VideoUrlProviderProps) {
  const [videoUrl, setVideoUrl] = useState<string>(props.videoUrl);

  return (
    <SetVideoUrlContext.Provider value={setVideoUrl}>
      <VideoUrlContext.Provider value={videoUrl}>{props.children}</VideoUrlContext.Provider>
    </SetVideoUrlContext.Provider>
  );
}
