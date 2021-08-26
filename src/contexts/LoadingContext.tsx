import React, { useState } from 'react';

const LoadingContext = React.createContext<
  [boolean, React.Dispatch<React.SetStateAction<boolean>>]
>([false, (state: React.SetStateAction<boolean>) => {}]);

export function useLoading() {
  return React.useContext(LoadingContext);
}

export function LoadingProvider(props: { children?: React.ReactNode }) {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={[loading, setLoading]}>
      {props.children}
    </LoadingContext.Provider>
  );
}
