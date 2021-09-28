import React, { useEffect, useState } from 'react';

import IVideo from '@interfaces/IVideo';
import IPlaylist from '@interfaces/IPlaylist';
import playlistApi from '@api/playlistApi';
import { useShowConfirm } from '@contexts/ConfirmContext';
import { usePushMessage } from '@contexts/MessageQueueContext';

import PlaylistVideo from './PlaylistVideo';

import './PlaylistVideos.css';
import { useSetLoading } from '@contexts/LoadingContext';

interface PlaylistVideosProps {
  playlistId: number;
  className?: string;
}

function PlaylistVideos({ playlistId, className }: PlaylistVideosProps) {
  const [playlist, setPlaylist] = useState<IPlaylist | null>(null);
  const [videos, setVideos] = useState<Array<IVideo>>([]);

  const { showConfirm } = useShowConfirm();
  const pushMessage = usePushMessage();
  const setLoading = useSetLoading();

  useEffect(() => {
    setLoading(true);
    playlistApi
      .getPlaylistVideos(+playlistId)
      .then(setVideos)
      .finally(() => setLoading(false));
    setLoading(true);
    playlistApi
      .getPlaylist(+playlistId)
      .then(setPlaylist)
      .finally(() => setLoading(false));
  }, [playlistId, setLoading]);

  function handleRemovePlaylistVideo(video: IVideo) {
    if (playlist === null) return;
    showConfirm('Bạn có muốn xóa Video này khỏi Playlist ' + playlist.name, () =>
      playlistApi
        .removeVideoFromPlaylist(playlistId, video.id)
        .then(() => {
          setVideos(videos.filter((v) => v.id !== video.id));
          pushMessage('Đã xóa Video khỏi Playlist');
        })
        .catch(() => pushMessage('Xóa Video khỏi Playlist không thành công'))
    );
  }

  if (playlist === null) return null;
  return (
    <div className={`PlaylistVideos ${className || ''}`}>
      <div className="PlaylistVideos__Header">
        <div className="PVH-Name">{playlist.name}</div>
        <div className="PVH-TotalVideos">{playlist.totalVideos} videos</div>
      </div>
      <div className="playlistVideos__Container">
        {videos.map((video, i) => (
          <PlaylistVideo
            key={video.id}
            video={video}
            playlistId={playlistId}
            number={i + 1}
            handleRemovePlaylistVideo={handleRemovePlaylistVideo}
          />
        ))}
      </div>
    </div>
  );
}

export default PlaylistVideos;
