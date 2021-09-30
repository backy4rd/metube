import React from 'react';
import {
  History,
  SubscriptionsOutlined,
  LiveTvOutlined,
  ThumbUpOutlined,
  QueueOutlined,
} from '@material-ui/icons';

import { useShowSidebar } from '@contexts/ShowSidebarContext';

import SidebarNavigationTag from './SidebarNavigationTag';
import ChannelInfo from './ChannelInfo';
import MyPlaylists from './MyPlaylists';
import MySubscriptions from './MySubscriptions';

import './Sidebar.css';

function Sidebar() {
  const [showSidebar, setShowSidebar] = useShowSidebar();

  if (!showSidebar)
    return (
      <div className="SidebarWrapper" style={{ width: 0 }}>
        <div className="Sidebar">
          <div className="Sidebar-Toggle expand" onClick={() => setShowSidebar(true)}></div>
        </div>
      </div>
    );

  return (
    <div className="SidebarWrapper">
      <div className="Sidebar">
        <SidebarNavigationTag to="/" Icon={LiveTvOutlined} title="Trang chủ" />
        <ChannelInfo />

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
