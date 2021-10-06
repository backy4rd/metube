import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Delete, PlayArrowOutlined } from '@material-ui/icons';

import IVideo from '@interfaces/IVideo';
import { useAuth } from '@contexts/AuthContext';
import IPlaylist from '@interfaces/IPlaylist';

import VideoThumbnail from '@components/VideoThumbnail';

import './PlaylistVideo.css';

interface PlaylistVideoProps {
  video: IVideo;
  playlist: IPlaylist;
  number: number;
  showAddedDate?: boolean;
  handleRemovePlaylistVideo?: (video: IVideo) => void;
}

function PlaylistVideo({
  video,
  playlist,
  number,
  showAddedDate = false,
  handleRemovePlaylistVideo,
}: PlaylistVideoProps) {
  const { pathname } = useLocation();
  const { user } = useAuth();

  const to = `/watch/${video.id}/playlist/${playlist.id}`;
  const [addedDate] = video.addedAt.toLocaleString().split(',');

  return (
    <div className={`PlaylistVideoWrapper ${pathname === to ? 'active' : ''}`}>
      <div className="PlaylistVideo-Number">{pathname === to ? <PlayArrowOutlined /> : number}</div>
      <Link to={to} className="PlaylistVideo">
        <VideoThumbnail className="PlaylistVideo-Thumbnail" video={video} showViews={false} />
        <div className="PlaylistVideo__Detail">
          <div className="PlaylistVideo__Detail-Title App-Text2Line">
            {video.title || 'Video riêng tư hoặc đã bị chặn!'}
          </div>
          {showAddedDate && (
            <div className="PlaylistVideo__Detail-Username">Đã thêm ngày {addedDate}</div>
          )}
          <div className="PlaylistVideo__Detail-Username">{video.uploadedBy.username}</div>
        </div>
      </Link>
      <div className="PlaylistVideo-Remove">
        {user && user.username === playlist.createdBy.username && (
          <Delete onClick={() => handleRemovePlaylistVideo?.(video)} />
        )}
      </div>
    </div>
  );
}

export default PlaylistVideo;
