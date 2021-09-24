import React, { useState } from 'react';

import UploadFile from './UploadFile';
import UploadHandler from './UploadHandler';

import './Upload.css';

function Upload() {
  const [videoFile, setVideoFile] = useState<File | null>(null);

  return (
    <div className="upload">
      {videoFile ? (
        <UploadHandler videoFile={videoFile} setVideoFile={setVideoFile} />
      ) : (
        <UploadFile setVideoFile={setVideoFile} />
      )}
    </div>
  );
}

export default Upload;
