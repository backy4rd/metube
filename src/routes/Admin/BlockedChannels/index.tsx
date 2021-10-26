import React, { useEffect, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import adminApi from '@api/adminApi';
import { useSetLoading } from '@contexts/LoadingContext';
import IUser from '@interfaces/IUser';
import { usePushMessage } from '@contexts/MessageQueueContext';

import Sequence from '@utils/Sequence';
import User from '@components/User';
import UserSkeleton from '@components/User/UserSkeleton';

import './BlockedChannels.css';

const step = 10;

function BlockedChannels() {
  const [users, setUsers] = useState<Array<IUser>>([]);
  const hasMore = useRef(true);

  const setLoading = useSetLoading();
  const pushMessage = usePushMessage();

  useEffect(() => {
    hasMore.current = true;
    setLoading(true);
    adminApi
      .getBlockedUsers({ offset: 0, limit: step })
      .then((_users) => {
        if (_users.length !== step) hasMore.current = false;
        setUsers(_users);
      })
      .finally(() => setLoading(false));
  }, [setLoading]);

  async function loadSubscribers() {
    const _users = await adminApi.getBlockedUsers({
      offset: users.length,
      limit: step,
    });
    if (_users.length !== step) hasMore.current = false;
    setUsers([...users, ..._users]);
  }

  const handleRemoveBlock = (user: IUser) => async () => {
    try {
      setLoading(true);
      await adminApi.modifyUser(user.username, 'unban');
      pushMessage('Đã gỡ chăn ' + user.username);
      setUsers((us) => us.filter((u) => u.username !== user.username));
    } catch {
      pushMessage('Gỡ chặn không thành công');
    } finally {
      setLoading(false);
    }
  };

  return (
    <InfiniteScroll
      className="App-UserGrid"
      dataLength={users.length}
      next={loadSubscribers}
      hasMore={hasMore.current}
      loader={<Sequence Component={UserSkeleton} length={7} />}
      scrollableTarget="Main"
    >
      {users.map((user) => (
        <User
          key={user.username}
          user={user}
          SubscribeButtonReplacement={
            <div
              className="App-RedButton BlockedChannels-RemoveBlockButton"
              onClick={handleRemoveBlock(user)}
            >
              GỠ CHẶN KÊNH
            </div>
          }
        />
      ))}
    </InfiniteScroll>
  );
}

export default BlockedChannels;
