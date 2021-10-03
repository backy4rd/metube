import React, { useEffect, useRef } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import queryString from 'query-string';

import { useSetLoading } from '@contexts/LoadingContext';
import { useCategories } from '@contexts/CategoriesContext';
import { useGlobal, useSetGlobal } from '@contexts/GlobalContext';
import ICategory from '@interfaces/ICategory';
import videoApi from '@api/videoApi';
import useQuery from '@hooks/useQuery';
import useGoToSameRoute from '@hooks/useGoToSameRoute';

import CategoriesBar from './CategoriesBar';
import VerticalVideoSkeleton from '@components/VerticalVideo/VerticalVideoSkeleton';
import VerticalVideo from '@components/VerticalVideo';
import Sequence from '@utils/Sequence';
import NotFound from '@components/NotFound';

import './Home.css';

const step = 20;

function Home() {
  const { home } = useGlobal();
  const { category } = useQuery();
  const hasMore = useRef(true);

  const setGlobal = useSetGlobal();
  const categories = useCategories();
  const setLoading = useSetLoading();

  useGoToSameRoute(() => {
    initalHomeVideos();
  });

  useEffect(() => {
    if (home.category !== category || home.videos.length === 0) {
      initalHomeVideos();
    }
    // eslint-disable-next-line
  }, [category]);

  async function initalHomeVideos() {
    try {
      hasMore.current = true;
      setLoading(true);
      setGlobal({ home: { videos: [], category: category } });
      const _videos = await videoApi.getVideos({ limit: step, offset: 0 }, category || undefined);
      if (_videos.length !== step) hasMore.current = false;
      setGlobal({ home: { videos: _videos, category: category } });
    } catch {
    } finally {
      setLoading(false);
    }
  }

  async function loadVideos() {
    const _videos = await videoApi.getVideos(
      { limit: step, offset: home.videos.length },
      category || undefined
    );
    if (_videos.length !== step) hasMore.current = false;
    setGlobal({
      home: {
        videos: [...home.videos, ..._videos],
        category: category,
      },
    });
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
          dataLength={home.videos.length}
          next={loadVideos}
          hasMore={hasMore.current}
          endMessage={<NotFound text="Không còn video để hiển thị !" />}
          loader={<Sequence Component={VerticalVideoSkeleton} length={8} />}
          scrollableTarget="Main"
        >
          {home.videos.map((video) => (
            <VerticalVideo key={video.id} video={video} />
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
}

export default Home;
