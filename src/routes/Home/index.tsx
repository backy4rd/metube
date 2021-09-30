import React, { useEffect, useRef } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import queryString from 'query-string';

import { useSetLoading } from '@contexts/LoadingContext';
import { useCategories } from '@contexts/CategoriesContext';
import { useHomeVideos } from '@contexts/HomeVideosContext';
import IVideo from '@interfaces/IVideo';
import { isSkeleton } from '@interfaces/ISkeleton';
import videoApi from '@api/videoApi';
import useQuery from '@hooks/useQuery';
import ICategory from '@interfaces/ICategory';
import detectCategory from '@utils/detectCategory';
import generateSkeletons from '@utils/generateSkeleton';

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
    async function initalVideos() {
      try {
        setLoading(true);
        setVideos(generateSkeletons(step / 2));
        const _videos = await videoApi.getVideos({ limit: step, offset: 0 }, qCategory);
        setVideos(_videos);
      } catch {
      } finally {
        setLoading(false);
      }
    }

    if (
      detectCategory(videos.filter((v) => !isSkeleton(v)) as Array<IVideo>) !== qCategory ||
      !isMounting.current ||
      videos.length === 0
    ) {
      initalVideos();
    }
    // eslint-disable-next-line
  }, [qCategory]);

  useEffect(() => {
    isMounting.current = false;
  }, []);

  async function loadVideos() {
    setVideos([...videos, ...generateSkeletons(step / 4)]);
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
          dataLength={videos.filter((v) => !isSkeleton(v)).length}
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
