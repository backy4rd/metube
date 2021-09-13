import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

const ShowSidebarContext = React.createContext<
  [boolean, React.Dispatch<React.SetStateAction<boolean>>]
>([false, (state: React.SetStateAction<boolean>) => {}]);

export function useShowSidebar() {
  return React.useContext(ShowSidebarContext);
}

export function ShowSidebarProvider(props: { children?: React.ReactNode }) {
  const isWidthUnder900 = useMediaQuery({ maxWidth: 900 });
  const [showSidebar, setShowSidebar] = useState(!isWidthUnder900);

  useEffect(() => {
    setShowSidebar(!isWidthUnder900);
  }, [isWidthUnder900]);

  return (
    <ShowSidebarContext.Provider value={[showSidebar, setShowSidebar]}>
      {props.children}
    </ShowSidebarContext.Provider>
  );
}
