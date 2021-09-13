import { useEffect, MutableRefObject } from 'react';
import { useLocation } from 'react-router-dom';

interface ScrollToTopProps {
  containerRef: MutableRefObject<HTMLDivElement | null>;
}

export default function ScrollToTop({ containerRef }: ScrollToTopProps) {
  const { pathname } = useLocation();

  //   console.log(useHistory());

  useEffect(() => {
    if (containerRef.current === null) return;
    containerRef.current.scrollTo(0, 0);
  }, [containerRef, pathname]);

  return null;
}
