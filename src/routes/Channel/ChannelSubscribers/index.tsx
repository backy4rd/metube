import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';

import userApi from '@api/userApi';
import { useSetLoading } from '@contexts/LoadingContext';
import IUser from '@interfaces/IUser';

import User from '@components/User';

import './ChannelSubscribers.css';

const step = 13;

function ChannelSubscribers() {
  const { username } = useParams<{ username: string }>();
  const [subscribers, setSubscribers] = useState<Array<IUser>>([]);

  const setLoading = useSetLoading();

  useEffect(() => {
    setLoading(true);
    userApi
      .getUserSubscribers(username, { offset: 0, limit: step })
      .then(setSubscribers)
      .finally(() => setLoading(false));
  }, [setLoading, username]);

  async function loadSubscribers() {
    const _subscribers = await userApi.getOwnSubscribers({
      offset: subscribers.length,
      limit: step,
    });
    setSubscribers([...subscribers, ..._subscribers]);
  }

  return (
    <InfiniteScroll
      dataLength={subscribers.length}
      next={loadSubscribers}
      hasMore={true}
      loader={null}
      scrollableTarget="Main"
    >
      <div className="ChannelSubscribers">
        {subscribers.map((subscriber) => (
          <User user={subscriber} />
        ))}
      </div>
    </InfiniteScroll>
  );
}

export default ChannelSubscribers;
