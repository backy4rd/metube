import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

const ShowSidebarContext = React.createContext<
  [boolean, React.Dispatch<React.SetStateAction<boolean>>]
>([false, (state: React.SetStateAction<boolean>) => {}]);

export function useShowSidebar() {
  return React.useContext(ShowSidebarContext);
}

export function ShowSidebarProvider(props: { children?: React.ReactNode }) {
  const isMobile = useMediaQuery({ maxWidth: 600 });
  const [showSidebar, setShowSidebar] = useState(!isMobile);

  useEffect(() => {
    setShowSidebar(!isMobile);
  }, [isMobile]);

  return (
    <ShowSidebarContext.Provider value={[showSidebar, setShowSidebar]}>
      {props.children}
    </ShowSidebarContext.Provider>
  );
}
