import { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

function ScrollToTop({ history, containerRef }: any) {
  useEffect(() => {
    if (containerRef.current === null) return;
    const unlisten = history.listen(() => containerRef.current.scrollTo(0, 0));

    return () => {
      unlisten();
    };
  }, [history, containerRef]);

  return null;
}

export default withRouter(ScrollToTop);
