import React, { useEffect, useRef } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import queryString from 'query-string';

import { useSetLoading } from '@contexts/LoadingContext';
import { useCategories } from '@contexts/CategoriesContext';
import { useHomeVideos } from '@contexts/HomeVideosContext';
import { isSkeleton } from '@interfaces/ISkeleton';
import IVideo from '@interfaces/IVideo';
import ICategory from '@interfaces/ICategory';
import videoApi from '@api/videoApi';
import useQuery from '@hooks/useQuery';
import detectCategory from '@utils/detectCategory';

import CategoriesBar from './CategoriesBar';
import VerticalVideoSkeleton from '@components/VerticalVideo/VerticalVideoSkeleton';
import VerticalVideo from '@components/VerticalVideo';
import Sequence from '@utils/Sequence';

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
        setVideos([]);
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
          className="App-VerticalVideoGrid"
          dataLength={videos.length}
          next={loadVideos}
          hasMore={videos.length % step === 0}
          loader={<Sequence Component={VerticalVideoSkeleton} length={8} />}
          scrollableTarget="Main"
        >
          {videos.map((video) => (
            <VerticalVideo key={video.id} video={video} />
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
}

export default Home;
