import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';

import IPlaylist from '@interfaces/IPlaylist';
import userApi from '@api/userApi';
import { useSetLoading } from '@contexts/LoadingContext';

import Sequence from '@utils/Sequence';
import HorizontalPlaylist from '@components/HorizontalPlaylist';
import NotFound from '@components/NotFound';
import HorizontalPlaylistSkeleton from '@components/HorizontalPlaylist/HorizontalPlaylistSkeleton';

import './ChannelPlaylists.css';

const step = 10;

function ChannelPlaylists() {
  const [playlists, setPlaylists] = useState<Array<IPlaylist>>([]);
  const { username } = useParams<{ username: string }>();
  const hasMore = useRef(true);

  const setLoading = useSetLoading();

  useEffect(() => {
    hasMore.current = true;
    setLoading(true);
    userApi
      .getUserPlaylists(username, { offset: 0, limit: step })
      .then((_playlists) => {
        if (_playlists.length !== step) hasMore.current = false;
        setPlaylists(_playlists);
      })
      .finally(() => setLoading(false));
  }, [setLoading, username]);

  async function loadPlaylists() {
    const _playlists = await userApi.getUserPlaylists(username, {
      offset: playlists.length,
      limit: step,
    });
    if (_playlists.length !== step) hasMore.current = false;
    setPlaylists([...playlists, ..._playlists]);
  }

  return (
    <InfiniteScroll
      className="ChannelPlaylists App-HorizontalPlaylistGrid"
      dataLength={playlists.length}
      next={loadPlaylists}
      hasMore={hasMore.current}
      endMessage={<NotFound text="Không còn playlist để hiển thị" horizontal />}
      loader={<Sequence Component={HorizontalPlaylistSkeleton} length={8} />}
      scrollableTarget="Main"
    >
      {playlists.map((playlist) => (
        <HorizontalPlaylist key={playlist.id} playlist={playlist} />
      ))}
    </InfiniteScroll>
  );
}

export default ChannelPlaylists;
