import React, { useEffect, useState } from 'react';

import { useAuth } from './AuthContext';
import IUser from '@interfaces/IUser';
import userApi from '@api/userApi';
import subscriptionApi from '@api/subscriptionApi';

const SubscriptionsContext = React.createContext<{
  subscriptions: Array<IUser>;
  subscribe: (user: IUser) => void;
  unsubscribe: (user: string | IUser) => void;
}>({
  subscriptions: [],
  subscribe: () => {},
  unsubscribe: () => {},
});

export function useSubscriptions() {
  return React.useContext(SubscriptionsContext);
}

export function SubscriptionsProvider(props: { children?: React.ReactNode }) {
  const [subscriptions, setSubscriptions] = useState<Array<IUser>>([]);

  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    userApi.getSubscriptionUsers().then(setSubscriptions);
  }, [user]);

  async function unsubscribe(user: string | IUser) {
    const username = typeof user === 'string' ? user : user.username;

    await subscriptionApi.unsubscribe(username);
    setSubscriptions(subscriptions.filter((u) => u.username !== username));
  }

  async function subscribe(user: IUser) {
    await subscriptionApi.subscribe(user.username);
    setSubscriptions([...subscriptions, user]);
  }

  return (
    <SubscriptionsContext.Provider value={{ subscriptions, subscribe, unsubscribe }}>
      {props.children}
    </SubscriptionsContext.Provider>
  );
}
