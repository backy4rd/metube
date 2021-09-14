import React, { useState } from 'react';

const LoadingContext = React.createContext<boolean>(false);

const SetLoadingContext = React.createContext<React.Dispatch<React.SetStateAction<boolean>>>(
  (state: React.SetStateAction<boolean>) => {}
);

export function useLoading() {
  return React.useContext(LoadingContext);
}

export function useSetLoading() {
  return React.useContext(SetLoadingContext);
}

export function LoadingProvider(props: { children?: React.ReactNode }) {
  const [loading, setLoading] = useState(false);

  return (
    <SetLoadingContext.Provider value={setLoading}>
      <LoadingContext.Provider value={loading}>{props.children}</LoadingContext.Provider>
    </SetLoadingContext.Provider>
  );
}
