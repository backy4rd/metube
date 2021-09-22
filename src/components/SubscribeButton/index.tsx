import React from 'react';
import { Link } from 'react-router-dom';

import { useSubscriptions } from '@contexts/SubscriptionsContext';
import { useAuth } from '@contexts/AuthContext';
import { useSetShowAuthForm } from '@contexts/ShowAuthFormContext';
import { useSetLoading } from '@contexts/LoadingContext';
import IUser from '@interfaces/IUser';

import './SubscribeButton.css';

interface SubscribeButtonProps {
  targetUser: IUser;
  className?: string;
}

function SubscribeButton({ targetUser, className }: SubscribeButtonProps) {
  const { subscriptions, subscribe, unsubscribe } = useSubscriptions();
  const { user } = useAuth();
  const setShowAuthForm = useSetShowAuthForm();
  const setLoading = useSetLoading();

  const isSubscribed = subscriptions.some((user) => user.username === targetUser.username);
  const isChannelOwner = user && user.username === targetUser.username;

  async function handleSubscribeButtonClick() {
    if (targetUser === null) return;

    // not login
    if (user === null) {
      setShowAuthForm(true);
      return;
    }

    setLoading(true);
    if (isSubscribed) {
      await unsubscribe(targetUser);
    } else {
      await subscribe(targetUser);
    }
    setLoading(false);
  }

  if (user === undefined) return null;
  return (
    <div className={`SubscribeButton ${className || ''}`}>
      {isChannelOwner ? (
        <div className="editChannelButton">
          <Link to="/channel/me/edit">CHỈNH SỬA KÊNH</Link>
        </div>
      ) : (
        <div
          className={`${isSubscribed ? ' subscribed' : ''}`}
          onClick={handleSubscribeButtonClick}
        >
          {isSubscribed ? 'ĐÃ ĐĂNG KÝ' : 'ĐĂNG KÝ'}
        </div>
      )}
    </div>
  );
}

export default SubscribeButton;
