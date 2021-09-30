import AuthButton from '@components/AuthButton';
import { useAuth } from '@contexts/AuthContext';
import { useSubscriptions } from '@contexts/SubscriptionsContext';
import { Skeleton } from '@mui/material';
import React from 'react';
import SidebarGroup from '../SidebarGroup';
import SidebarUserTag from '../SidebarUserTag';

import './MySubscriptions.css';

function MySubscriptionsSkeleton() {
  return (
    <SidebarGroup>
      {Array(3)
        .fill(null)
        .map((u) => (
          <Skeleton height={40} />
        ))}
    </SidebarGroup>
  );
}

function MySubscriptions() {
  const { subscriptions } = useSubscriptions();
  const { user } = useAuth();

  if (user === undefined) return null;
  if (user === null)
    return (
      <SidebarGroup>
        <div style={{ fontSize: 12, color: 'var(--main-grey-2)', marginBottom: 8 }}>
          Đăng nhập để tương tác, bình luận và đăng kí những video mới nhất.
        </div>
        <AuthButton />
      </SidebarGroup>
    );

  if (subscriptions === null) return null;
  if (subscriptions === undefined) return <MySubscriptionsSkeleton />;
  return (
    <SidebarGroup>
      {subscriptions.map((u) => (
        <SidebarUserTag key={u.username} user={u} />
      ))}
    </SidebarGroup>
  );
}

export default MySubscriptions;
