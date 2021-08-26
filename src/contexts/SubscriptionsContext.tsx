import React, { useEffect, useState } from 'react';

import IUser from '@interfaces/IUser';
import userApi from '@api/userApi';

const SubscriptionsContext = React.createContext<{
  subscriptions: Array<IUser>;
  subscribe: (user: IUser) => void;
  unsubscribe: (user: number | IUser) => void;
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

  useEffect(() => {
    userApi.getSubscriptionUsers().then(setSubscriptions);
  }, []);

  function unsubscribe(user: number | IUser) {
    if (typeof user === 'number') {
      setSubscriptions(subscriptions.filter((u) => u.id !== user));
    } else {
      setSubscriptions(subscriptions.filter((u) => u.id !== user.id));
    }
  }

  function subscribe(user: IUser) {
    setSubscriptions([...subscriptions, user]);
  }

  return (
    <SubscriptionsContext.Provider value={{ subscriptions, subscribe, unsubscribe }}>
      {props.children}
    </SubscriptionsContext.Provider>
  );
}
