import React from 'react';
import { useHistory } from 'react-router-dom';
import { PlaylistAdd, Delete, Edit } from '@material-ui/icons';

import videoApi from '@api/videoApi';
import { useAuth } from '@contexts/AuthContext';
import { useVideo } from '@contexts/VideoContext';
import { useShowConfirm } from '@contexts/ConfirmContext';
import { usePushMessage } from '@contexts/MessageQueueContext';

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

  async function handleRemoveVideo() {
    try {
      videoApi.removeVideo(video.id);
      pushMessage('Xóa video thành công!');
      history.goBack();
    } catch {
      pushMessage('Xóa video thất bại!');
    }
  }

  if (!user) return null;
  return (
    <Popup className="ActionPopup" target={props.target}>
      {user.username === video.uploadedBy.username && (
        <div
          className="ActionPopup-Action"
          onClick={() =>
            showConfirm(
              'Hành động này sẽ khiến video bị xóa vĩnh viễn, bạn có chắc vẫn muốn thực hiện?',
              handleRemoveVideo
            )
          }
        >
          <Delete />
          <div className="ActionPopup-Action-Text">Xóa Video</div>
        </div>
      )}
      {user.username === video.uploadedBy.username && (
        <div className="ActionPopup-Action">
          <Edit />
          <div className="ActionPopup-Action-Text">Sửa Video</div>
        </div>
      )}
      <div className="ActionPopup-Action">
        <PlaylistAdd />
        <div className="ActionPopup-Action-Text">Thêm vào danh sách phát</div>
      </div>
    </Popup>
  );
}

export default ActionPopup;
