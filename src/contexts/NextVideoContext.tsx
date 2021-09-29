import React, { useState } from 'react';

import IVideo from '@interfaces/IVideo';

const NextVideoContext = React.createContext<IVideo | null>(null);

const SetNextVideoContext = React.createContext<
  React.Dispatch<React.SetStateAction<IVideo | null>>
>(() => {});

export function useNextVideo() {
  return React.useContext(NextVideoContext);
}

export function useSetNextVideo() {
  return React.useContext(SetNextVideoContext);
}

interface NextVideoProviderProps {
  children: React.ReactNode;
}

export function NextVideoProvider(props: NextVideoProviderProps) {
  const [nextVideo, setNextVideo] = useState<IVideo | null>(null);

  return (
    <SetNextVideoContext.Provider value={setNextVideo}>
      <NextVideoContext.Provider value={nextVideo}>{props.children}</NextVideoContext.Provider>
    </SetNextVideoContext.Provider>
  );
}
