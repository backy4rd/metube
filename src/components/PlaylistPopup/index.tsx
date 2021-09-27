import React, { useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Close, PlaylistAdd } from '@material-ui/icons';

import playlistApi from '@api/playlistApi';
import { usePlaylistPopup, usePlaylistVideoId } from '@contexts/PlaylistPopupContext';
import { usePlaylists, useSetPlaylists } from '@contexts/PlaylistsContext';
import { usePushMessage } from '@contexts/MessageQueueContext';
import { useSetLoading } from '@contexts/LoadingContext';

import './PlaylistPopup.css';
import IPlaylist from '@interfaces/IPlaylist';

function PlaylistPopup() {
  const [playlistName, setPlaylistName] = useState('');

  const playlists = usePlaylists();
  const videoId = usePlaylistVideoId();
  const { hidePlaylistPopup } = usePlaylistPopup();
  const pushMessage = usePushMessage();
  const setLoading = useSetLoading();
  const setPlaylists = useSetPlaylists();

  const loading = useRef<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  async function addToPlaylist(playlist: IPlaylist) {
    if (!videoId || loading.current) return;
    try {
      loading.current = true;
      setLoading(true);
      await playlistApi.addVideoToPlaylist(playlist.id, videoId);
      hidePlaylistPopup();
      pushMessage('Đã thêm vào ' + playlist.name);
    } catch (err) {
      if (err.data?.fail?.message === 'video already exist in playlist') {
        pushMessage('Video đã tồn tại trong playlist');
      } else {
        pushMessage('Thêm Video vào Playlist không thành công!');
      }
    } finally {
      setLoading(false);
      loading.current = false;
    }
  }

  async function createAndAddToPlaylist() {
    if (!videoId || loading.current) return;
    try {
      loading.current = true;
      setLoading(true);
      const newPlaylist = await playlistApi.createPlaylist({ name: playlistName });
      await playlistApi.addVideoToPlaylist(newPlaylist.id, videoId);
      hidePlaylistPopup();
      setPlaylists([newPlaylist, ...playlists]);
      pushMessage('Đã thêm vào Playlist mới tạo');
    } catch (err) {
      pushMessage('Tạo Playlist hoặc thêm Video không thành công!');
    } finally {
      setLoading(false);
      loading.current = false;
    }
  }

  return (
    <CSSTransition
      nodeRef={ref}
      in={videoId !== null}
      timeout={200}
      classNames="PlaylistPopupWrapper"
      unmountOnExit
    >
      <div ref={ref} className="PlaylistPopupWrapper">
        <div className="PlaylistPopup">
          <div className="PlaylistPopup-Header">
            <div className="PlaylistPopup-Header-Text">Chọn playlist</div>
            <Close className="PlaylistPopup-Header-Close" onClick={hidePlaylistPopup} />
          </div>
          <div className="PlaylistPopup-Main">
            <div className="PlaylistPopup-Playlists">
              {playlists.map((playlist) => (
                <div key={playlist.id} className="PPP-Item" onClick={() => addToPlaylist(playlist)}>
                  <PlaylistAdd />
                  {playlist.name}
                </div>
              ))}
            </div>
            <div className="PlaylistPopup-Create">
              <div className="PPC-Label">Tạo Mới Playlist:</div>
              <input
                className="PPC-PlaylistName App-TextInput"
                onChange={(e) => setPlaylistName(e.target.value)}
                value={playlistName}
                type="text"
                placeholder="Tên Playlist"
              />
            </div>

            {playlistName !== '' && (
              <div className="PlaylistPopup-Buttons">
                <div className="PPB-Button App-GreenButton" onClick={createAndAddToPlaylist}>
                  Tạo Và Thêm
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </CSSTransition>
  );
}

export default PlaylistPopup;
