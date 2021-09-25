import React, { useEffect, useState } from 'react';

import userApi from '@api/userApi';
import { useSetLoading } from '@contexts/LoadingContext';
import IUser from '@interfaces/IUser';

import User from '@components/User';

import './ChannelSubscriptions.css';

function ChannelSubscriptions() {
  const [subscriptions, setSubscriptions] = useState<Array<IUser>>([]);

  const setLoading = useSetLoading();

  useEffect(() => {
    setLoading(true);
    userApi
      .getOwnSubscription()
      .then(setSubscriptions)
      .finally(() => setLoading(false));
  }, [setLoading]);

  return (
    <div className="ChannelSubscriptions">
      {subscriptions.map((subscriber) => (
        <User user={subscriber} />
      ))}
    </div>
  );
}

export default ChannelSubscriptions;
