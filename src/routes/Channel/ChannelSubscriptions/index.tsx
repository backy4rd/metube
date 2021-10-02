import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';

import userApi from '@api/userApi';
import { useSetLoading } from '@contexts/LoadingContext';
import IUser from '@interfaces/IUser';

import User from '@components/User';
import UserSkeleton from '@components/User/UserSkeleton';
import Sequence from '@utils/Sequence';

import './ChannelSubscriptions.css';

const step = 14;

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
      className="ChannelSubscriptions"
      dataLength={subscriptions.length}
      next={loadSubscriptions}
      hasMore={subscriptions.length % step === 0}
      loader={<Sequence Component={UserSkeleton} length={7} />}
      scrollableTarget="Main"
    >
      {subscriptions.map((subscription) => (
        <User key={subscription.username} user={subscription} />
      ))}
    </InfiniteScroll>
  );
}

export default ChannelSubscriptions;
