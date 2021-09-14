import React, { useEffect, useRef } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import queryString from 'query-string';

import { useSetLoading } from '@contexts/LoadingContext';
import { useCategories } from '@contexts/CategoriesContext';
import { useHomeVideos } from '@contexts/HomeVideosContext';
import videoApi from '@api/videoApi';
import useQuery from '@hooks/useQuery';
import ICategory from '@interfaces/ICategory';
import detectCategory from '@utils/detectCategory';

import VerticalVideos from '@components/VerticalVideos';

import CategoriesBar from './CategoriesBar';

import './Home.css';

const step = 20;

function Home() {
  const [videos, setVideos] = useHomeVideos();
  const categories = useCategories();
  const isMounting = useRef(true);

  const setLoading = useSetLoading();
  const { category: _qCategory } = useQuery();
  const qCategory = _qCategory ? _qCategory.toString() : undefined;

  useEffect(() => {
    if (detectCategory(videos) === qCategory && isMounting.current && videos.length !== 0) return;
    setLoading(true);
    setVideos([]); // prevent showing old video
    videoApi
      .getVideos({ limit: step, offset: 0 }, qCategory)
      .then(setVideos)
      .finally(() => setLoading(false));
    // eslint-disable-next-line
  }, [qCategory]);

  useEffect(() => {
    isMounting.current = false;
  }, []);

  async function loadVideos() {
    const _videos = await videoApi.getVideos({ limit: step, offset: videos.length }, qCategory);
    setVideos([...videos, ..._videos]);
  }

  function processPath(category: ICategory): string {
    const query = {
      category: category.category,
    };
    return '/?' + queryString.stringify(query);
  }

  return (
    <div className="Home">
      <CategoriesBar categories={categories} processPath={processPath} />

      <div className="Home__Container">
        <InfiniteScroll
          dataLength={videos.length}
          next={loadVideos}
          hasMore={true}
          loader={null}
          scrollableTarget="Main"
        >
          <VerticalVideos videos={videos} />
        </InfiniteScroll>
      </div>
    </div>
  );
}

export default Home;
