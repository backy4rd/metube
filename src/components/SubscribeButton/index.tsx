import React from 'react';
import { Link } from 'react-router-dom';

import { useSubscriptions } from '@contexts/SubscriptionsContext';
import { useAuth } from '@contexts/AuthContext';
import { useShowAuthForm } from '@contexts/ShowAuthFormContext';
import { useSetLoading } from '@contexts/LoadingContext';
import subscriptionApi from '@api/subscriptionApi';
import IUser from '@interfaces/IUser';

import './SubscribeButton.css';

function SubscribeButton({ targetUser }: { targetUser: IUser }) {
  const { subscriptions, subscribe, unsubscribe } = useSubscriptions();
  const { user } = useAuth();
  const [, setShowAuthForm] = useShowAuthForm();
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
      await subscriptionApi.unsubscribe(targetUser.username);
      unsubscribe(targetUser);
    } else {
      await subscriptionApi.subscribe(targetUser.username);
      subscribe(targetUser);
    }
    setLoading(false);
  }

  if (user === undefined) return null;
  return (
    <div className="SubscribeButton">
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
