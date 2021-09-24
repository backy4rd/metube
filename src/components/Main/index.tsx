import React, { useRef } from 'react';
import { Route, Switch } from 'react-router-dom';

import { HomeVideosProvider } from '@contexts/HomeVideosContext';
import { CategoriesProvider } from '@contexts/CategoriesContext';
import ScrollToTop from '@utils/scrollToTop';

import AuthorizedRoute from '@routes/AuthorizedRoute';
import Home from '@routes/Home';
import Watch from '@routes/Watch';
import Playlist from '@routes/Playlist';
import Channel from '@routes/Channel';
import Subscriptions from '@routes/Subscriptions';
import History from '@routes/History';
import Upload from '@components/Upload';

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
          <Route path="/channel/:username" component={Channel} />
          <AuthorizedRoute path="/upload" component={Upload} />
          <AuthorizedRoute path="/subscription" component={Subscriptions} />
          <AuthorizedRoute path="/history" component={History} />
          <AuthorizedRoute exact path="/playlist" component={() => <div>playlists</div>} />
          <AuthorizedRoute path="/liked" component={() => <div>liked</div>} />
        </RouteContext>
      </Switch>
    </div>
  );
}

export default Main;
