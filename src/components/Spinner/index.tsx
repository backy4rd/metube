import React from 'react';
import CachedIcon from '@material-ui/icons/Cached';

import './Spinner.css';

type Props = {
  loading: boolean;
  className?: string;
};

function Spinner({ loading, className }: Props) {
  if (loading === false) return null;

  return (
    <div className={`spinner ${className || ''}`}>
      <CachedIcon />
    </div>
  );
}

export default Spinner;
