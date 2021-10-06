import React, { useEffect, useState, useRef } from 'react';
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
  const hasMore = useRef(true);

  const setLoading = useSetLoading();

  useEffect(() => {
    hasMore.current = true;
    setLoading(true);
    userApi
      .getUserSubscription(username, { offset: 0, limit: step })
      .then((_subscriptions) => {
        if (_subscriptions.length !== step) hasMore.current = false;
        setSubscriptions(_subscriptions);
      })
      .finally(() => setLoading(false));
  }, [setLoading, username]);

  async function loadSubscriptions() {
    const _subscriptions = await userApi.getUserSubscription('me', {
      offset: subscriptions.length,
      limit: step,
    });
    if (_subscriptions.length !== step) hasMore.current = false;
    setSubscriptions([...subscriptions, ..._subscriptions]);
  }

  return (
    <InfiniteScroll
      className="ChannelSubscriptions"
      dataLength={subscriptions.length}
      next={loadSubscriptions}
      hasMore={hasMore.current}
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
