import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import IPlaylist from '@interfaces/IPlaylist';
import { useSetLoading } from '@contexts/LoadingContext';
import playlistApi from '@api/playlistApi';

import PlaylistVideos from '@components/PlaylistVideos';
import PlaylistInfo from './PlaylistEdit';

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
      <PlaylistInfo className="Playlist-Edit" playlist={playlist} />
      <PlaylistVideos className="Playlist-Videos" playlist={playlist} />
    </div>
  );
}

export default Playlist;
