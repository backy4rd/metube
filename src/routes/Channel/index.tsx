import React, { useEffect, useState } from 'react';
import { Route, Switch, useParams, useRouteMatch, Redirect } from 'react-router-dom';

import IUser from '@interfaces/IUser';
import { useSetLoading } from '@contexts/LoadingContext';
import userApi from '@api/userApi';

import ChannelHeader from './ChannelHeader';
import ChannelTabs from './ChannelTabs';
import ChannelVideos from './ChannelVideos';
import ChannelSubscribers from './ChannelSubscribers';
import ChannelSubscriptions from './ChannelSubscriptions';
import ChannelStream from './ChannelStream';

import './Channel.css';

function Home() {
  const [user, setUser] = useState<IUser | null>(null);
  const { username } = useParams<{ username: string }>();
  const { path } = useRouteMatch();

  const setLoading = useSetLoading();

  useEffect(() => {
    setLoading(true);
    userApi
      .getUserProfile(username)
      .then(setUser)
      .finally(() => setLoading(false));
  }, [setLoading, username]);

  if (!user) return null;
  return (
    <div className="Channel">
      <ChannelHeader user={user} />
      <ChannelTabs user={user} />

      <div className="Channel__Container">
        <Switch>
          <Route exact path={`${path}/`} component={ChannelVideos} />
          <Route exact path={`${path}/playlist`} component={() => <div>playlist</div>} />
          <Route exact path={`${path}/live`} component={ChannelStream} />
          <Route exact path={`${path}/subscriber`} component={ChannelSubscribers} />
          <Route exact path={`${path}/subscription`} component={ChannelSubscriptions} />
          <Route exact path={`${path}/about`} component={() => <div>info</div>} />
          <Route exact path={`${path}/edit`} component={() => <div>edtit</div>} />
          <Redirect to="/404" />
        </Switch>
      </div>
    </div>
  );
}

export default Home;
