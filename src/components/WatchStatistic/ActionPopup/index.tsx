import React from 'react';
import { useHistory } from 'react-router-dom';
import { PlaylistAdd, Delete, Block, Timeline } from '@material-ui/icons';

import videoApi from '@api/videoApi';
import { useAuth } from '@contexts/AuthContext';
import { useVideo } from '@contexts/VideoContext';
import { useShowConfirm } from '@contexts/ConfirmContext';
import { usePushMessage } from '@contexts/MessageQueueContext';
import { usePlaylistPopup } from '@contexts/PlaylistPopupContext';

import Popup from '@components/Popup';

import './ActionPopup.css';

interface ActionPopupProps {
  target: string;
}

function ActionPopup(props: ActionPopupProps) {
  const video = useVideo();
  const { user } = useAuth();
  const { showConfirm } = useShowConfirm();
  const pushMessage = usePushMessage();
  const history = useHistory();
  const { showPlaylistPopup } = usePlaylistPopup();

  if (!user) return null;
  if (!video) return null;

  async function handleRemoveVideo() {
    if (!video) return;
    try {
      videoApi.removeVideo(video.id);
      pushMessage('Xóa video thành công!');
      history.goBack();
    } catch {
      pushMessage('Xóa video thất bại!');
    }
  }

  return (
    <Popup className="ActionPopup" target={props.target}>
      <div className="ActionPopup-Action" onClick={() => showPlaylistPopup(video.id)}>
        <PlaylistAdd />
        <div className="ActionPopup-Action-Text">Thêm Vào Danh Sách Phát</div>
      </div>
      {user.username === video.uploadedBy.username && (
        <div className="ActionPopup-Action">
          <Timeline />
          <div className="ActionPopup-Action-Text">Tổng quan Video</div>
        </div>
      )}
      {user.username === video.uploadedBy.username && (
        <div
          className="ActionPopup-Action"
          onClick={() =>
            showConfirm(
              'Video của bạn sẽ bị xóa vĩnh viễn, bạn có chắc vẫn muốn thực hiện?',
              handleRemoveVideo
            )
          }
        >
          <Delete />
          <div className="ActionPopup-Action-Text">Xóa Video</div>
        </div>
      )}
      {user.role === 'admin' && (
        <div className="ActionPopup-Action">
          <Block />
          <div className="ActionPopup-Action-Text">Chặn Video</div>
        </div>
      )}
    </Popup>
  );
}

export default ActionPopup;
