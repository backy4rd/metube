import { EffectCallback, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';

export default function useGoToSameRoute(effect: EffectCallback) {
  const { location, action } = useHistory();
  const prevLocation = useRef<string | null>(location.pathname + location.search);

  useEffect(() => {
    if (action === 'POP') return;
    if (location.pathname + location.search === prevLocation.current) {
      return effect();
    }
    prevLocation.current = location.pathname + location.search;
    // eslint-disable-next-line
  }, [location, action]);
}
