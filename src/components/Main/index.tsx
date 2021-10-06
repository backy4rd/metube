import React, { useRef } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { GlobalProvider } from '@contexts/GlobalContext';
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
import Liked from '@routes/Liked';
import Playlists from '@routes/Playlists';
import Upload from '@components/Upload';
import NotFound from '@components/NotFound';
import Lives from '@routes/Lives';
import Live from '@routes/Live';

import './Main.css';

function MainSwitchContext(props: { children: React.ReactNode }) {
  return (
    <CategoriesProvider>
      <GlobalProvider>{props.children}</GlobalProvider>
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
          <Route exact path="/watch/:videoId/playlist/:playlistId" component={Watch} />
          <Route exact path="/playlist/:playlistId" component={Playlist} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/live" component={Lives} />
          <Route exact path="/live/:streamId" component={Live} />
          <Route path="/channel/:username" component={Channel} />
          <AuthorizedRoute exact path="/upload" component={Upload} />
          <AuthorizedRoute exact path="/subscription" component={Subscriptions} />
          <AuthorizedRoute exact path="/history" component={History} />
          <AuthorizedRoute exact path="/playlist" component={Playlists} />
          <AuthorizedRoute exact path="/liked" component={Liked} />
          <Route path="/404" component={NotFound} /> {/* may put in some other place*/}
          <Redirect to="/404" />
        </Switch>
      </MainSwitchContext>
    </div>
  );
}

export default Main;
