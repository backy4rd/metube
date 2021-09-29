import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import IPlaylist from '@interfaces/IPlaylist';
import playlistApi from '@api/playlistApi';
import { useSetLoading } from '@contexts/LoadingContext';
import { NextVideoProvider } from '@contexts/NextVideoContext';

import PlaylistVideos from '@components/PlaylistVideos';
import PlaylistInfo from './PlaylistInfo';

import './Playlist.css';

function Playlist() {
  const [playlist, setPlaylist] = useState<IPlaylist | null>(null);
  const { playlistId } = useParams<{ playlistId: string }>();

  const setLoading = useSetLoading();

  useEffect(() => {
    setLoading(true);
    playlistApi
      .getPlaylist(+playlistId)
      .then(setPlaylist)
      .finally(() => setLoading(false));
  }, [setLoading, playlistId]);

  if (playlist === null) return null;
  return (
    <div className="Playlist">
      <NextVideoProvider>
        <PlaylistInfo className="Playlist-Edit" playlist={playlist} />
        <PlaylistVideos className="Playlist-Videos" playlist={playlist} />
      </NextVideoProvider>
    </div>
  );
}

export default Playlist;
