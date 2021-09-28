import React, { useEffect, useState } from 'react';

import searchApi from '@api/searchApi';
import { useSetLoading } from '@contexts/LoadingContext';
import useQuery from '@hooks/useQuery';
import IVideo from '@interfaces/IVideo';

import HorizontalVideos from '@components/HorizontalVideos';

import './Search.css';

function Search() {
  const [videos, setVideos] = useState<Array<IVideo>>([]);

  const setLoading = useSetLoading();
  const { q: _q } = useQuery();
  const q = _q ? _q.toString() : '';

  useEffect(() => {
    setLoading(true);
    searchApi
      .searchVideos(q)
      .then(setVideos)
      .finally(() => setLoading(false));
  }, [q, setLoading]);

  return (
    <div className="Search">
      <div style={{ fontSize: '15px' }}>Kết quả tìm kiếm:</div>
      <HorizontalVideos videos={videos} extend />
    </div>
  );
}

export default Search;
