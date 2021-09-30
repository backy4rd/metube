import React, { useState } from 'react';

import IVideo from '@interfaces/IVideo';
import ISkeleton from '@interfaces/ISkeleton';

const HomeVideosContext = React.createContext<
  [Array<IVideo | ISkeleton>, React.Dispatch<React.SetStateAction<Array<IVideo | ISkeleton>>>]
>([[], () => {}]);

export function useHomeVideos() {
  return React.useContext(HomeVideosContext);
}

interface HomeVideoProviderProps {
  children: React.ReactNode;
}

export function HomeVideosProvider(props: HomeVideoProviderProps) {
  const videoState = useState<Array<IVideo | ISkeleton>>([]);

  return (
    <HomeVideosContext.Provider value={videoState}>{props.children}</HomeVideosContext.Provider>
  );
}
