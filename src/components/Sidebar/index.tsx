import React from 'react';
import { useMediaQuery } from 'react-responsive';
import {
  AdminPanelSettingsOutlined,
  History,
  SubscriptionsOutlined,
  LiveTvOutlined,
  ThumbUpOutlined,
  QueueOutlined,
  RadioButtonChecked,
} from '@mui/icons-material';

import { useShowSidebar } from '@contexts/ShowSidebarContext';
import { useAuth } from '@contexts/AuthContext';

import SidebarNavigationTag from './SidebarNavigationTag';
import SidebarNavigationIcon from './SidebarNavigationIcon';
import ChannelInfo from './ChannelInfo';
import MyPlaylists from './MyPlaylists';
import MySubscriptions from './MySubscriptions';

import './Sidebar.css';

function Sidebar() {
  const [showSidebar, setShowSidebar] = useShowSidebar();
  const isWidthUnder600 = useMediaQuery({ maxWidth: 600 });

  const { user } = useAuth();

  if (isWidthUnder600 && !showSidebar) {
    return null;
  }

  if (!showSidebar)
    return (
      <div className="SidebarWrapper" style={{ width: 72 }}>
        <div className="Sidebar">
          <SidebarNavigationIcon to="/" Icon={LiveTvOutlined} title="Trang chủ" />
          <SidebarNavigationIcon to="/live" Icon={RadioButtonChecked} title="Live now" />
          <SidebarNavigationIcon to="/history" Icon={History} title="Lịch sử" />
          <SidebarNavigationIcon to="/liked" Icon={ThumbUpOutlined} title="Đã thích" />
          <SidebarNavigationIcon to="/playlist" Icon={QueueOutlined} title="Danh mục phát" />
          <SidebarNavigationIcon
            to="/subscription"
            Icon={SubscriptionsOutlined}
            title="Đã đăng ký"
          />
          <div className="Sidebar-Toggle expand" onClick={() => setShowSidebar(true)}></div>
        </div>
      </div>
    );

  return (
    <div className="SidebarWrapper">
      <div className="Sidebar">
        <SidebarNavigationTag to="/" Icon={LiveTvOutlined} title="Trang chủ" />
        <ChannelInfo />
        {user?.role === 'admin' && (
          <SidebarNavigationTag
            to="/admin"
            Icon={AdminPanelSettingsOutlined}
            title="Admin"
            exact={false}
          />
        )}

        <SidebarNavigationTag to="/live" Icon={RadioButtonChecked} title="Live now" />
        <SidebarNavigationTag to="/history" Icon={History} title="Lịch sử" />

        <SidebarNavigationTag to="/liked" Icon={ThumbUpOutlined} title="Đã thích" />

        <SidebarNavigationTag to="/playlist" Icon={QueueOutlined} title="Danh mục phát" />
        <MyPlaylists />

        <SidebarNavigationTag to="/subscription" Icon={SubscriptionsOutlined} title="Đã đăng ký" />
        <MySubscriptions />

        <div className="Sidebar-Toggle colapse" onClick={() => setShowSidebar(false)}></div>
      </div>
    </div>
  );
}

export default Sidebar;
