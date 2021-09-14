import React, { useRef } from 'react';
import { Route, Switch } from 'react-router-dom';

import { HomeVideosProvider } from '@contexts/HomeVideosContext';
import { CategoriesProvider } from '@contexts/CategoriesContext';
import ScrollToTop from '@utils/scrollToTop';

import AuthorizedRoute from '@routes/AuthorizedRoute';
import Home from '@routes/Home';
import Watch from '@routes/Watch';
import Playlist from '@routes/Playlist';

import './Main.css';

function RouteContext(props: { children: React.ReactNode }) {
  return (
    <CategoriesProvider>
      <HomeVideosProvider>{props.children}</HomeVideosProvider>
    </CategoriesProvider>
  );
}

function Main() {
  const mainRef = useRef<HTMLDivElement>(null);

  return (
    <div id="Main" ref={mainRef}>
      <ScrollToTop containerRef={mainRef} />
      <Switch>
        <RouteContext>
          <Route exact path="/" component={Home} />
          <Route path="/watch/:id" component={Watch} />
          <Route path="/playlist/:id" component={Playlist} />
          <AuthorizedRoute path="/subscription" component={() => <div>subscriptions</div>} />
          <AuthorizedRoute path="/history" component={() => <div>history</div>} />
          <AuthorizedRoute exact path="/playlist" component={() => <div>playlists</div>} />
          <AuthorizedRoute path="/liked" component={() => <div>liked</div>} />
        </RouteContext>
      </Switch>
    </div>
  );
}

export default Main;
