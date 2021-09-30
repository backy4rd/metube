import React from 'react';
import { Link } from 'react-router-dom';

import { useSubscriptions } from '@contexts/SubscriptionsContext';
import { useAuth } from '@contexts/AuthContext';
import { useSetShowAuthForm } from '@contexts/ShowAuthFormContext';
import { useSetLoading } from '@contexts/LoadingContext';
import IUser from '@interfaces/IUser';
import { usePushMessage } from '@contexts/MessageQueueContext';

import './SubscribeButton.css';
import { Skeleton } from '@mui/material';

interface SubscribeButtonProps {
  targetUser: IUser;
  className?: string;
}

function SubscribeButton({ targetUser, className }: SubscribeButtonProps) {
  const { subscriptions, subscribe, unsubscribe } = useSubscriptions();
  const { user } = useAuth();
  const setShowAuthForm = useSetShowAuthForm();
  const setLoading = useSetLoading();
  const pushMesage = usePushMessage();

  if (user === undefined) return null;

  const isSubscribed = subscriptions?.some((user) => user.username === targetUser.username);
  const isChannelOwner = user && user.username === targetUser.username;

  async function handleSubscribeButtonClick() {
    if (targetUser === null) return;

    // not login
    if (user === null) {
      setShowAuthForm(true);
      return;
    }

    setLoading(true);
    try {
      if (isSubscribed) {
        await unsubscribe(targetUser);
      } else {
        await subscribe(targetUser);
      }
    } catch {
      pushMesage(`${isSubscribed ? 'Hủy đăng ký' : 'Đăng ký'} không thành công!`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className={`SubscribeButton ${isSubscribed ? 'App-GreyButton' : 'App-RedButton'} ${
        className || ''
      }`}
    >
      {user && isChannelOwner ? (
        <div className="editChannelButton">
          <Link to={`/channel/${user.username}/edit`}>CHỈNH SỬA KÊNH</Link>
        </div>
      ) : (
        <div onClick={handleSubscribeButtonClick}>
          {subscriptions === null ? <Skeleton /> : isSubscribed ? 'ĐÃ ĐĂNG KÝ' : 'ĐĂNG KÝ'}
        </div>
      )}
    </div>
  );
}

export default SubscribeButton;
