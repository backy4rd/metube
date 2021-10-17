import React from 'react';
import { Link } from 'react-router-dom';
import { PlaylistPlayRounded } from '@material-ui/icons';

import Playlist from '@interfaces/IPlaylist';
import ISkeleton, { isSkeleton } from '@interfaces/ISkeleton';
import { timeDifference } from '@utils/time';

import HorizontalPlaylistSkeleton from './HorizontalPlaylistSkeleton';
import Avatar from '@components/Avatar';

import './HorizontalPlaylist.css';

interface HorizontalPlaylistProps {
  playlist: Playlist | ISkeleton;
}

function HorizontalPlaylist({ playlist }: HorizontalPlaylistProps) {
  if (isSkeleton(playlist)) return <HorizontalPlaylistSkeleton />;
  return (
    <div className="HorizontalPlaylistWrapper">
      <Link className="HorizontalPlaylist" to={`/playlist/${playlist.id}`}>
        <div className="HorizontalPlaylist__Left">
          <PlaylistPlayRounded />
        </div>
        <div className="HorizontalPlaylist__Right">
          <div className="HPR-PlaylistName">{playlist.name}</div>
          <div className="HPR-CreatedAtAndNumOfVideos">
            {timeDifference(new Date(), playlist.createdAt)} - {playlist.totalVideos} videos
          </div>
          <div className="HPR__User">
            <Avatar className="HPR__User-Avatar" user={playlist.createdBy} size="24px" />
            <div className="HPR__User-Username">{playlist.createdBy.username}</div>
          </div>
          <div className="HPR-Description App-Text2Line">{playlist.description}</div>
        </div>
      </Link>
    </div>
  );
}

export default HorizontalPlaylist;
