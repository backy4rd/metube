import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';

import userApi from '@api/userApi';
import { useSetLoading } from '@contexts/LoadingContext';
import IUser from '@interfaces/IUser';
import ISkeleton, { isSkeleton } from '@interfaces/ISkeleton';
import generateSkeletons from '@utils/generateSkeleton';

import User from '@components/User';

import './ChannelSubscriptions.css';

const step = 14;

function ChannelSubscriptions() {
  const { username } = useParams<{ username: string }>();
  const [subscriptions, setSubscriptions] = useState<Array<IUser | ISkeleton>>([]);

  const setLoading = useSetLoading();

  useEffect(() => {
    setLoading(true);
    setSubscriptions(generateSkeletons(step));
    userApi
      .getUserSubscription(username, { offset: 0, limit: step })
      .then(setSubscriptions)
      .finally(() => setLoading(false));
  }, [setLoading, username]);

  async function loadSubscriptions() {
    setSubscriptions([...subscriptions, ...generateSkeletons(step / 2)]);
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
          <User
            key={isSkeleton(subscription) ? subscription.bone : subscription.username}
            user={subscription}
          />
        ))}
      </div>
    </InfiniteScroll>
  );
}

export default ChannelSubscriptions;
