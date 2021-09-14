import React from 'react';
import {
  TimelineOutlined,
  SubscriptionsOutlined,
  LiveTvOutlined,
  ThumbUpOutlined,
  QueueOutlined,
} from '@material-ui/icons';

import { useShowSidebar } from '@contexts/ShowSidebarContext';
import { useSubscriptions } from '@contexts/SubscriptionsContext';
import { useAuth } from '@contexts/AuthContext';
import { usePlaylists } from '@contexts/PlaylistsContext';

import AuthButton from '@components/AuthButton';
import SidebarNavigationTag from './SidebarNavigationTag';
import SidebarUserTag from './SidebarUserTag';
import SidebarGroup from './SidebarGroup';
import ChannelInfo from './ChannelInfo';

import './Sidebar.css';
import PlaylistTag from './PlaylistTag';

function Sidebar() {
  const [showSidebar, setShowSidebar] = useShowSidebar();
  const { subscriptions } = useSubscriptions();
  const playlists = usePlaylists();
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
          <SidebarGroup limit={1} showMoreNavigateTo={`/channel/${user.username}/about`}>
            <ChannelInfo />
          </SidebarGroup>
        )}

        <SidebarNavigationTag to="/history" Icon={TimelineOutlined} title="Lịch sử" />
        <SidebarNavigationTag to="/liked" Icon={ThumbUpOutlined} title="Đã thích" />
        <SidebarNavigationTag to="/playlist" Icon={QueueOutlined} title="Danh mục phát" />
        {user !== null && playlists.length > 0 && (
          <SidebarGroup limit={3}>
            {playlists.length > 0 &&
              playlists.map((playlist) => <PlaylistTag key={playlist.id} playlist={playlist} />)}
          </SidebarGroup>
        )}
        <SidebarNavigationTag to="/subscription" Icon={SubscriptionsOutlined} title="Đã đăng ký" />
        <SidebarGroup>
          {user !== null ? (
            subscriptions.map((u) => <SidebarUserTag key={u.username} user={u} />)
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
