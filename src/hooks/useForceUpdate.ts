import { useState } from 'react';

export default function useForceUpdate() {
  const [flag, updateFlag] = useState(true);
  return () => updateFlag(!flag);
}
