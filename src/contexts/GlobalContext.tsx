import React, { useCallback, useState } from 'react';

import IVideo from '@interfaces/IVideo';

interface GlobalStateProps {
  home: {
    videos: Array<IVideo>;
    category: string | null;
  };
}

const GlobalContext = React.createContext<GlobalStateProps>(undefined as any);
const SetGlobalContext = React.createContext<(change: Partial<GlobalStateProps>) => void>(() => {});

export function useGlobal() {
  return React.useContext(GlobalContext);
}

export function useSetGlobal() {
  return React.useContext(SetGlobalContext);
}

export function GlobalProvider(props: { children: React.ReactNode }) {
  const [globalState, _setGlobalState] = useState<GlobalStateProps>({
    home: { videos: [], category: null },
  });
  const setGlobalState = useCallback(
    (change: Partial<GlobalStateProps>) => _setGlobalState((state) => ({ ...state, ...change })),
    []
  );

  return (
    <GlobalContext.Provider value={globalState}>
      <SetGlobalContext.Provider value={setGlobalState}>{props.children}</SetGlobalContext.Provider>
    </GlobalContext.Provider>
  );
}
