import React from 'react';
import {
  TimelineOutlined,
  SubscriptionsOutlined,
  LiveTvOutlined,
  ThumbUpOutlined,
} from '@material-ui/icons';

import { useShowSidebar } from '@contexts/ShowSidebarContext';
import { useSubscriptions } from '@contexts/SubscriptionsContext';
import { useAuth } from '@contexts/AuthContext';

import AuthButton from '@components/AuthButton';
import SidebarNavigationTag from './SidebarNavigationTag';
import SidebarUserTag from './SidebarUserTag';
import SidebarGroup from './SidebarGroup';

import './Sidebar.css';

function Sidebar() {
  const [showSidebar, setShowSidebar] = useShowSidebar();
  const { subscriptions } = useSubscriptions();
  const { user } = useAuth();

  if (!showSidebar)
    return (
      <div className="SidebarWrapper" style={{ width: 0 }}>
        <div className="Sidebar">
          <div className="Sidebar-Toggle" onClick={() => setShowSidebar(true)}></div>
        </div>
      </div>
    );

  return (
    <div className="SidebarWrapper">
      <div className="Sidebar">
        <SidebarNavigationTag to="/" Icon={LiveTvOutlined} title="Trang chủ" />
        {user && (
          <SidebarGroup>
            <img src={user.iconPath} alt="" style={{ borderRadius: '50%' }} />
          </SidebarGroup>
        )}
        <SidebarNavigationTag to="/history" Icon={TimelineOutlined} title="Lịch sử" />
        <SidebarNavigationTag to="/liked" Icon={ThumbUpOutlined} title="Đã thích" />

        <SidebarNavigationTag
          to="/subscriptions"
          Icon={SubscriptionsOutlined}
          title="Kênh đăng ký"
        />
        <SidebarGroup>
          {user ? (
            subscriptions.map((u) => <SidebarUserTag user={u} />)
          ) : (
            <>
              <div style={{ fontSize: 12, color: 'var(--main-grey-2)', marginBottom: 8 }}>
                Đăng nhập để tương tác, bình luận và đăng kí những video mới nhất.
              </div>
              <AuthButton />
            </>
          )}
        </SidebarGroup>

        <div className="Sidebar-Toggle" onClick={() => setShowSidebar(false)}></div>
      </div>
    </div>
  );
}

export default Sidebar;
