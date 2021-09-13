import React, { useState } from 'react';

import IVideo from '@interfaces/IVideo';

const HomeVideosContext = React.createContext<
  [Array<IVideo>, React.Dispatch<React.SetStateAction<Array<IVideo>>>]
>([[], () => {}]);

export function useHomeVideos() {
  return React.useContext(HomeVideosContext);
}

interface HomeVideoProviderProps {
  children: React.ReactNode;
}

export function HomeVideosProvider(props: HomeVideoProviderProps) {
  const videoState = useState<Array<IVideo>>([]);

  return (
    <HomeVideosContext.Provider value={videoState}>{props.children}</HomeVideosContext.Provider>
  );
}
