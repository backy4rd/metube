import React from 'react';
import { Link } from 'react-router-dom';
import { PlaylistPlayRounded } from '@material-ui/icons';
import { Skeleton } from '@mui/material';

import { randomPercentage } from '@utils/number';
import { usePlaylists } from '@contexts/PlaylistsContext';
import { useAuth } from '@contexts/AuthContext';

import SidebarGroup from '../SidebarGroup';

import './MyPlaylists.css';

function MyPlaylistsSkeleton() {
  return (
    <SidebarGroup>
      {Array(2)
        .fill(null)
        .map((_, i) => (
          <div key={i} className="PlaylistTag">
            <Skeleton height={24} width={16} style={{ float: 'left', marginRight: 6 }} />
            <Skeleton height={24} width={randomPercentage(30, 100)} />
          </div>
        ))}
    </SidebarGroup>
  );
}

function MyPlaylists() {
  const playlists = usePlaylists();
  const { user } = useAuth();

  if (!user) return null;
  if (playlists === null) return <MyPlaylistsSkeleton />;
  if (playlists.length === 0) return null;
  return (
    <SidebarGroup limit={3}>
      {playlists.map((playlist) => (
        <Link key={playlist.id} to={`/playlist/${playlist.id}`}>
          <div className="PlaylistTag">
            <PlaylistPlayRounded />
            <div className="PlaylistTag-Name App-Text1Line">{playlist.name}</div>
          </div>
        </Link>
      ))}
    </SidebarGroup>
  );
}

export default MyPlaylists;
