import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import IVideo, { IVideoAnalysis } from '@interfaces/IVideo';
import videoApi from '@api/videoApi';
import fulfillAnalysisData from '@utils/fulfillAnalysisData';
import { useSetLoading } from '@contexts/LoadingContext';

import VerticalVideoSkeleton from '@components/VerticalVideo/VerticalVideoSkeleton';
import VerticalVideo from '@components/VerticalVideo';
import ChartOptionsSelector from '@components/ChartOptionsSelector';
import ViewChart from './ViewChart';
import ReactionChart from './ReactionChart';
import CommentChart from './CommentChart';

import './VideoAnalysis.css';

function VideoAnalysis() {
  const { videoId } = useParams<{ videoId: string }>();
  const [data, setData] = useState<IVideoAnalysis | null>(null);
  const [video, setVideo] = useState<IVideo | null>(null);
  const [unit, setUnit] = useState<'day' | 'month' | 'year'>('day');
  const [from, setFrom] = useState<Date | string | undefined>(() => {
    const now = new Date();
    now.setMonth(now.getMonth() - 3);
    return now.getFullYear() + '-' + (now.getMonth() + 1);
  });

  const setLoading = useSetLoading();

  useEffect(() => {
    setLoading(true);
    videoApi
      .getVideo(videoId)
      .then(setVideo)
      .finally(() => setLoading(false));
  }, [setLoading, videoId]);

  useEffect(() => {
    setLoading(true);
    videoApi
      .getVideoAnalysis(videoId, { unit: unit, from: from })
      .then(setData)
      .finally(() => setLoading(false));
  }, [videoId, unit, from, setLoading]);

  const filledData =
    data &&
    video &&
    fulfillAnalysisData(data, {
      from: from,
      unit: unit,
      uploadedAt: video.uploadedAt,
    });

  return (
    <div className="VideoAnalysis">
      <ChartOptionsSelector from={from} setFrom={setFrom} unit={unit} setUnit={setUnit} />

      <div className="VideoAnalysis__Content">
        <div className="VideoAnalysis-Title">THỐNG KÊ LƯỢT XEM</div>
        <div className="VideoAnalysis__Row1">
          <div className="VideoAnalysis__Video">
            {video === null ? <VerticalVideoSkeleton /> : <VerticalVideo video={video} />}
          </div>

          {filledData && <ViewChart className="VideoAnalysis__ViewChart" data={filledData.views} />}
        </div>
        <div className="VideoAnalysis-Title">THỐNG KÊ TƯƠNG TÁC</div>
        <div className="VideoAnalysis__Row2">
          {filledData && (
            <ReactionChart
              className="VideoAnalysis__ReactionChart"
              data={filledData.videoReactions}
            />
          )}

          {filledData && (
            <CommentChart className="VideoAnalysis__ReactionChart" data={filledData.comments} />
          )}
        </div>
      </div>
    </div>
  );
}

export default VideoAnalysis;
