import { EffectCallback, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export default function useGoToSameRoute(effect: EffectCallback) {
  const location = useLocation();
  const prevLocation = useRef<string | null>(null);

  useEffect(() => {
    if (location.pathname + location.search === prevLocation.current) {
      return effect();
    }
    prevLocation.current = location.pathname + location.search;
    // eslint-disable-next-line
  }, [location]);
}
