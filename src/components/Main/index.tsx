import React, { useRef } from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '@components/Home';
import Player from '@components/Player';
import ScrollToTop from '@utils/scrollToTop';

import './Main.css';

function Main() {
  const mainRef = useRef<HTMLDivElement>(null);

  return (
    <div id="Main" ref={mainRef}>
      <ScrollToTop containerRef={mainRef} />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/watch/:id" component={Player} />
      </Switch>
    </div>
  );
}

export default Main;
