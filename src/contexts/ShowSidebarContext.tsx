import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import useUpdateEffect from '@hooks/useUpdateEffect';

const ShowSidebarContext = React.createContext<
  [boolean, React.Dispatch<React.SetStateAction<boolean>>]
>([false, (state: React.SetStateAction<boolean>) => {}]);

export function useShowSidebar() {
  return React.useContext(ShowSidebarContext);
}

export function ShowSidebarProvider(props: { children?: React.ReactNode }) {
  const isWidthUnder900 = useMediaQuery({ maxWidth: 900 });
  const [showSidebar, setShowSidebar] = useState(!isWidthUnder900);

  const { pathname } = useLocation();

  useUpdateEffect(() => {
    if (pathname.match(/^\/watch\/\w+\/playlist\/\d+$/g)) return;
    setShowSidebar(!isWidthUnder900);
  }, [isWidthUnder900]);

  return (
    <ShowSidebarContext.Provider value={[showSidebar, setShowSidebar]}>
      {props.children}
    </ShowSidebarContext.Provider>
  );
}
