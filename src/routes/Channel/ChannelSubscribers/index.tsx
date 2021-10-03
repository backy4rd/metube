import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';

import userApi from '@api/userApi';
import { useSetLoading } from '@contexts/LoadingContext';
import IUser from '@interfaces/IUser';

import User from '@components/User';
import UserSkeleton from '@components/User/UserSkeleton';
import Sequence from '@utils/Sequence';

import './ChannelSubscribers.css';

const step = 14;

function ChannelSubscribers() {
  const { username } = useParams<{ username: string }>();
  const [subscribers, setSubscribers] = useState<Array<IUser>>([]);
  const hasMore = useRef(true);

  const setLoading = useSetLoading();

  useEffect(() => {
    hasMore.current = true;
    setLoading(true);
    userApi
      .getUserSubscribers(username, { offset: 0, limit: step })
      .then((_subscribers) => {
        if (_subscribers.length !== step) hasMore.current = false;
        setSubscribers(_subscribers);
      })
      .finally(() => setLoading(false));
  }, [setLoading, username]);

  async function loadSubscribers() {
    const _subscribers = await userApi.getOwnSubscribers({
      offset: subscribers.length,
      limit: step,
    });
    if (_subscribers.length !== step) hasMore.current = false;
    setSubscribers([...subscribers, ..._subscribers]);
  }

  return (
    <InfiniteScroll
      className="ChannelSubscribers"
      dataLength={subscribers.length}
      next={loadSubscribers}
      hasMore={hasMore.current}
      loader={<Sequence Component={UserSkeleton} length={7} />}
      scrollableTarget="Main"
    >
      {subscribers.map((subscriber) => (
        <User key={subscriber.username} user={subscriber} />
      ))}
    </InfiniteScroll>
  );
}

export default ChannelSubscribers;
