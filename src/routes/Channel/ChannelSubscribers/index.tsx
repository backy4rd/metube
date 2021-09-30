import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';

import userApi from '@api/userApi';
import { useSetLoading } from '@contexts/LoadingContext';
import IUser from '@interfaces/IUser';
import ISkeleton, { isSkeleton } from '@interfaces/ISkeleton';
import generateSkeletons from '@utils/generateSkeleton';

import User from '@components/User';

import './ChannelSubscribers.css';

const step = 14;

function ChannelSubscribers() {
  const { username } = useParams<{ username: string }>();
  const [subscribers, setSubscribers] = useState<Array<IUser | ISkeleton>>([]);

  const setLoading = useSetLoading();

  useEffect(() => {
    setLoading(true);
    setSubscribers(generateSkeletons(step));
    userApi
      .getUserSubscribers(username, { offset: 0, limit: step })
      .then(setSubscribers)
      .finally(() => setLoading(false));
  }, [setLoading, username]);

  async function loadSubscribers() {
    setSubscribers([...subscribers, ...generateSkeletons(step / 2)]);
    const _subscribers = await userApi.getOwnSubscribers({
      offset: subscribers.length,
      limit: step,
    });
    setSubscribers([...subscribers, ..._subscribers]);
  }

  return (
    <InfiniteScroll
      dataLength={subscribers.filter((s) => !!s).length}
      next={loadSubscribers}
      hasMore={true}
      loader={null}
      scrollableTarget="Main"
    >
      <div className="ChannelSubscribers">
        {subscribers.map((subscriber) => (
          <User
            key={isSkeleton(subscriber) ? subscriber.bone : subscriber.username}
            user={subscriber}
          />
        ))}
      </div>
    </InfiniteScroll>
  );
}

export default ChannelSubscribers;
