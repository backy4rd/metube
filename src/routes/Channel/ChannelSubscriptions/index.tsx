import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';

import userApi from '@api/userApi';
import { useSetLoading } from '@contexts/LoadingContext';
import IUser from '@interfaces/IUser';

import User from '@components/User';

import './ChannelSubscriptions.css';

const step = 13;

function ChannelSubscriptions() {
  const { username } = useParams<{ username: string }>();
  const [subscriptions, setSubscriptions] = useState<Array<IUser>>([]);

  const setLoading = useSetLoading();

  useEffect(() => {
    setLoading(true);
    userApi
      .getUserSubscription(username, { offset: 0, limit: step })
      .then(setSubscriptions)
      .finally(() => setLoading(false));
  }, [setLoading, username]);

  async function loadSubscriptions() {
    const _subscriptions = await userApi.getOwnSubscription({
      offset: subscriptions.length,
      limit: step,
    });
    setSubscriptions([...subscriptions, ..._subscriptions]);
  }

  return (
    <InfiniteScroll
      dataLength={subscriptions.length}
      next={loadSubscriptions}
      hasMore={true}
      loader={null}
      scrollableTarget="Main"
    >
      <div className="ChannelSubscriptions">
        {subscriptions.map((subscription) => (
          <User key={subscription.username} user={subscription} />
        ))}
      </div>
    </InfiniteScroll>
  );
}

export default ChannelSubscriptions;
