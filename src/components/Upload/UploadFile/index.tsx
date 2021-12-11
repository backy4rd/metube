import React, { useState } from 'react';

import UploadIcon from './UploadIcon';

import './UploadFile.css';

type Props = {
  setVideoFile: React.Dispatch<React.SetStateAction<File | null>>;
};

function UploadFile({ setVideoFile }: Props) {
  const [isDragIn, setIsDragIn] = useState(false);

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragIn(true);
  }

  function handleDragLeave(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragIn(false);
  }

  function handleDropFile(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragIn(false);
    if (!e.dataTransfer.files) return;

    const file = e.dataTransfer.files[0];
    if (!/video\/.+/.test(file.type)) return;

    setVideoFile(e.dataTransfer.files[0]);
  }

  return (
    <div
      className={'uploadFileWrapper' + (isDragIn ? ' dragIn' : '')}
      onDragOver={handleDragOver}
      onDrop={handleDropFile}
      onDragLeave={handleDragLeave}
    >
      <div className="uploadFile">
        <UploadIcon />
        <h1>Kéo thả video để tải lên</h1>
        <label>
          <div className="App-GreenButton" style={{ padding: '8px 24px' }}>
            Hoặc chọn video để tải lên
          </div>

          <input
            type="file"
            accept="video/matroska,video/*"
            onChange={(e) => setVideoFile(e.target.files ? e.target.files[0] : null)}
            style={{ display: 'none' }}
          />
        </label>
      </div>
    </div>
  );
}

export default UploadFile;
