import React, { useEffect, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import queryString from 'query-string';

import videoApi from '@api/videoApi';
import categoryApi from '@api/categoryApi';
import useQuery from '@hooks/useQuery';
import { useLoading } from '@contexts/LoadingContext';
import IVideo from '@interfaces/IVideo';
import ICategory from '@interfaces/ICategory';

import VerticalVideos from '@components/VerticalVideos';
import CategoriesBar from './CategoriesBar';

import './Home.css';

const step = 20;

function Home() {
  const [videos, setVideos] = useState<Array<IVideo>>([]);
  const [categories, setCategories] = useState<Array<ICategory>>([]);
  const offset = useRef(0);

  const [, setLoading] = useLoading();
  const { category } = useQuery();
  /* const { category } = { category: 'Trò Chơi' }; */

  useEffect(() => {
    categoryApi.getCategories().then(setCategories);
    /* categoryApi */
    /*   .getCategories() */
    /*   .then((cs) => setCategories([...cs, ...cs.map((c) => ({ ...c, id: Math.random() }))])); */
  }, []);

  useEffect(() => {
    async function loadFirstVideos() {
      try {
        setLoading(true);
        const _videos = await videoApi.getVideos(
          { limit: step, offset: 0 },
          category ? category.toString() : undefined
        );
        setVideos(_videos);
        offset.current = step;
      } catch {
      } finally {
        setLoading(false);
      }
    }

    loadFirstVideos();
  }, [category, setLoading]);

  async function loadVideos() {
    const _videos = await videoApi.getVideos(
      { limit: step, offset: offset.current },

      category ? category.toString() : undefined
    );
    setVideos([...videos, ..._videos]);
    offset.current += step;
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
