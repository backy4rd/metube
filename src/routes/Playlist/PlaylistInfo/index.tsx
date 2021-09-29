import React, { useEffect, useRef, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { TextareaAutosize } from '@material-ui/core';
import { Close, PlayArrow } from '@material-ui/icons';

import IPlaylist from '@interfaces/IPlaylist';
import { timeDifference } from '@utils/time';
import playlistApi from '@api/playlistApi';
import { useAuth } from '@contexts/AuthContext';
import { useSetLoading } from '@contexts/LoadingContext';
import { usePushMessage } from '@contexts/MessageQueueContext';
import { usePlaylists, useSetPlaylists } from '@contexts/PlaylistsContext';
import { useShowConfirm } from '@contexts/ConfirmContext';
import { useNextVideo } from '@contexts/NextVideoContext';

import User from '@components/User';

import './PlaylistInfo.css';

interface PlaylistInfoProps {
  playlist: IPlaylist;
  className?: string;
}

function PlaylistInfo({ className, playlist }: PlaylistInfoProps) {
  const [description, setDescription] = useState(playlist.description || '');
  const [name, setName] = useState(playlist.name);
  const memoName = useRef<string | null>(null); // null mean not updating
  const memoDescription = useRef<string | null>(null); // null mean not updating

  const { user } = useAuth();
  const { showConfirm } = useShowConfirm();
  const setLoading = useSetLoading();
  const pushMessage = usePushMessage();
  const playlists = usePlaylists();
  const setPlaylists = useSetPlaylists();
  const nextVideo = useNextVideo();
  const history = useHistory();

  useEffect(() => {
    setName(playlist.name);
    setDescription(playlist.description || '');
  }, [playlist]);

  async function handleUpdatePlaylistName() {
    if (memoName.current === null) return;
    if (memoName.current === name) return (memoName.current = null);
    try {
      setLoading(true);
      await playlistApi.updatePlaylist(playlist.id, { name });
      setName(name); // reupdate when multiple change occur
      const updatedPlaylist = playlists.find((pl) => pl.id === playlist.id) as IPlaylist;
      updatedPlaylist.name = name;
      setPlaylists([...playlists]);
      pushMessage('Đã cập nhật playlist');
    } catch {
      setName(memoName.current);
      pushMessage('Cập nhật thất bại');
    } finally {
      setLoading(false);
      memoName.current = null;
    }
  }

  async function handleUpdatePlaylistDescription() {
    if (memoDescription.current === null) return;
    if (memoDescription.current === description) return (memoDescription.current = null);
    try {
      setLoading(true);
      await playlistApi.updatePlaylist(playlist.id, { description });
      setDescription(description); // reupdate when multiple change occur
      pushMessage('Đã cập nhật playlist');
    } catch {
      setDescription(memoDescription.current);
      pushMessage('Cập nhật thất bại');
    } finally {
      setLoading(false);
      memoDescription.current = null;
    }
  }

  async function handleRemovePlaylist() {
    try {
      setLoading(true);
      await playlistApi.deletePlaylist(playlist.id);
      setPlaylists(playlists.filter((pl) => pl.id !== playlist.id));
      pushMessage('Đã xóa Playlist');
      history.goBack();
    } catch {
      pushMessage('Xóa Playlist thất bại');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={`PlaylistInfo ${className || ''}`}>
      <div className="PlaylistInfo-Label">
        Tạo cách đây: {timeDifference(new Date(), playlist.createdAt)}
      </div>
      <div className="PlaylistInfo-Label">Được tạo bởi:</div>
      <User user={playlist.createdBy} />

      <div className="PlaylistInfo__Buttons">
        <Link to={`/watch/${nextVideo?.id}/playlist/${playlist.id}`} className="PIB-Button">
          <PlayArrow />
          <div className="PIB-Button-Text">Phát Ngay</div>
        </Link>
        {user && user.username === playlist.createdBy.username && (
          <div
            className="PIB-Button"
            onClick={() =>
              showConfirm(`Bạn có muốn xóa Playlist ${playlist.name} không!`, handleRemovePlaylist)
            }
          >
            <Close />
            <div className="PIB-Button-Text">Xóa Playlist</div>
          </div>
        )}
      </div>

      <div className="PlaylistEdit">
        <div className="PlaylistEdit-Item">
          <div className="PlaylistInfo-Label">Tên Playlist:</div>
          <input
            className="App-TextInput PlaylistEdit-Text"
            placeholder="Playlist name"
            type="text"
            disabled={!user || user.username !== playlist.createdBy.username}
            value={name}
            onChange={(e) => setName(e.target.value)}
            onFocus={() => (memoName.current = name)}
            onBlur={handleUpdatePlaylistName}
          />
        </div>

        <div className="PlaylistEdit-Item">
          <div className="PlaylistInfo-Label">Mô tả:</div>
          <TextareaAutosize
            className="App-TextInput PlaylistEdit-Text"
            style={{ color: 'var(--main-grey-3)' }}
            placeholder="Description"
            disabled={!user || user.username !== playlist.createdBy.username}
            maxRows={8}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onFocus={() => (memoDescription.current = description)}
            onBlur={handleUpdatePlaylistDescription}
          />
        </div>
      </div>
    </div>
  );
}

export default PlaylistInfo;
