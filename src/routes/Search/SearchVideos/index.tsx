import React, { useEffect, useState } from 'react';

import searchApi from '@api/searchApi';
import { useLoading, useSetLoading } from '@contexts/LoadingContext';
import useQuery from '@hooks/useQuery';
import IVideo from '@interfaces/IVideo';
import generateSkeletons from '@utils/generateSkeleton';

import HorizontalVideos from '@components/HorizontalVideos';
import SearchNotFound from '../SearchNotFound';

import './SearchVideos.css';

function SearchVideos() {
  const [videos, setVideos] = useState<Array<IVideo>>([]);

  const setLoading = useSetLoading();
  const loading = useLoading();
  const { q = '', from } = useQuery();

  useEffect(() => {
    setVideos([]);
    setLoading(true);
    searchApi
      .searchVideos(
        {
          q: q,
          max_upload_date: from,
        },
        { offset: 0, limit: 100 }
      )
      .then(setVideos)
      .finally(() => setLoading(false));
  }, [from, q, setLoading]);

  return (
    <div className="SearchVideos">
      {videos.length === 0 && !loading ? (
        <SearchNotFound />
      ) : (
        <div className="SearchVideos__Result">
          {videos.length > 0 && (
            <div style={{ fontSize: '15px' }}>
              {videos.length === 100 && 'Hơn'} {videos.length} video được tìm thấy:
            </div>
          )}
          <HorizontalVideos videos={videos.length === 0 ? generateSkeletons(5) : videos} extend />
        </div>
      )}
    </div>
  );
}

export default SearchVideos;
