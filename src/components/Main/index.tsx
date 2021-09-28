import React, { useRef } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

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
import Search from '@routes/Search';
import Upload from '@components/Upload';
import NotFound from '@components/NotFound';

import './Main.css';

function MainSwitchContext(props: { children: React.ReactNode }) {
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
      <MainSwitchContext>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/watch/:videoId" component={Watch} />
          <Route exact path="/playlist/:playlistId" component={Playlist} />
          <Route exact path="/playlist/:playlistId/watch/:videoId" component={Watch} />
          <Route exact path="/search" component={Search} />
          <Route path="/channel/:username" component={Channel} />
          <AuthorizedRoute exact path="/upload" component={Upload} />
          <AuthorizedRoute exact path="/subscription" component={Subscriptions} />
          <AuthorizedRoute exact path="/history" component={History} />
          <AuthorizedRoute exact path="/playlist" component={() => <div>playlists</div>} />
          <AuthorizedRoute exact path="/liked" component={() => <div>liked</div>} />
          <Route path="/404" component={NotFound} /> {/* may put in some other place*/}
          <Redirect to="/404" />
        </Switch>
      </MainSwitchContext>
    </div>
  );
}

export default Main;
