import React, { useEffect, useState } from 'react';
import { Route, Switch, useParams, useRouteMatch } from 'react-router-dom';

import IUser from '@interfaces/IUser';
import { useSetLoading } from '@contexts/LoadingContext';
import userApi from '@api/userApi';

import ChannelHeader from './ChannelHeader';
import ChannelTabs from './ChannelTabs';
import ChannelVideos from './ChannelVideos';

import './Channel.css';

function Home() {
  const [user, setUser] = useState<IUser | null>(null);
  const { username } = useParams<{ username: string }>();
  const { path } = useRouteMatch();

  const setLoading = useSetLoading();

  useEffect(() => {
    setLoading(false);
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

      <div className="Channel__ChannelVideos">
        <Switch>
          <Route exact path={`${path}/`}>
            <ChannelVideos username={username} />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Home;
