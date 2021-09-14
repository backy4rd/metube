import React, { useEffect, useState } from 'react';

import IVideo from '@interfaces/IVideo';
import IComment from '@interfaces/IComment';
import commentApi from '@api/commentApi';

import './Comments.css';

interface CommentsProps {
  video: IVideo;
}

function Comments({ video }: CommentsProps) {
  const [comments, setComments] = useState<Array<IComment>>([]);

  useEffect(() => {
    commentApi.getComments(video.id).then(setComments);
  }, [video.id]);

  return (
    <div className="Comments">
      <Comment comment={comments} />
    </div>
  );
}

export default Comments;

