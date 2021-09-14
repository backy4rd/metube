import React from 'react';
import { CSSTransition } from 'react-transition-group';

import { useLoading } from '@contexts/LoadingContext';

import './Loading.css';

function Loading() {
  const loading = useLoading();

  return (
    <CSSTransition
      in={loading}
      timeout={{
        enter: 10000,
        exit: 1000,
      }}
      classNames="Loading"
      unmountOnExit
    >
      <div className="Loading"></div>
    </CSSTransition>
  );
}

export default Loading;
