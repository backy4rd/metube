import React, { useEffect, useState } from 'react';

import { useAuth } from './AuthContext';
import IUser from '@interfaces/IUser';
import userApi from '@api/userApi';
import subscriptionApi from '@api/subscriptionApi';

const SubscriptionsContext = React.createContext<{
  subscriptions: Array<IUser> | null | undefined;
  subscribe: (user: IUser) => void;
  unsubscribe: (user: string | IUser) => void;
}>({
  subscriptions: null,
  subscribe: () => {},
  unsubscribe: () => {},
});

export function useSubscriptions() {
  return React.useContext(SubscriptionsContext);
}

export function SubscriptionsProvider(props: { children?: React.ReactNode }) {
  const [subscriptions, setSubscriptions] = useState<Array<IUser> | null | undefined>(undefined);

  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    userApi.getUserSubscription('me', { offset: 0, limit: 100 }).then(setSubscriptions);
  }, [user]);

  async function unsubscribe(user: string | IUser) {
    if (!subscriptions) return;
    const username = typeof user === 'string' ? user : user.username;

    await subscriptionApi.unsubscribe(username);
    setSubscriptions(subscriptions.filter((u) => u.username !== username));
  }

  async function subscribe(user: IUser) {
    if (!subscriptions) return;
    await subscriptionApi.subscribe(user.username);
    setSubscriptions([user, ...subscriptions]);
  }

  return (
    <SubscriptionsContext.Provider value={{ subscriptions, subscribe, unsubscribe }}>
      {props.children}
    </SubscriptionsContext.Provider>
  );
}
