import React, { useEffect, useRef, useState } from 'react';
import { isMobile } from 'react-device-detect';

import useForceUpdate from '@hooks/useForceUpdate';
import ICategory from '@interfaces/ICategory';

import Categories from '@components/Categories';

import './CategoriesBar.css';

interface CategoriesBarProps {
  categories: ICategory[];
  processPath?: (c: ICategory) => string;
}

function CategoriesBar(props: CategoriesBarProps) {
  const [left, setLeft] = useState(0);
  const categoriesRef = useRef<HTMLDivElement>(null);

  const forceUpdate = useForceUpdate();

  useEffect(() => {
    forceUpdate();
    // eslint-disable-next-line
  }, [categoriesRef.current]);

  useEffect(() => {
    if (!categoriesRef.current) return;
    categoriesRef.current.style.transform = `translateX(-${left}px)`;
  }, [left]);

  useEffect(() => {
    if (!categoriesRef.current) return;

    function updateSize() {
      setLeft(0);
    }
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
    // eslint-disable-next-line
  }, [categoriesRef.current, left]);

  const isScrollable =
    categoriesRef.current &&
    categoriesRef.current.clientWidth !== categoriesRef.current.scrollWidth;
  const maxLeft =
    categoriesRef.current && categoriesRef.current.scrollWidth - categoriesRef.current.clientWidth;

  function goLeft() {
    const afterClick = left - 350;
    setLeft(afterClick < 0 ? 0 : afterClick);
  }

  function goRight() {
    const afterClick = left + 350;
    setLeft(afterClick > maxLeft! ? maxLeft! : afterClick);
  }

  return (
    <div className="CategoriesBar" style={{ overflowX: isMobile ? 'auto' : 'hidden' }}>
      {!isMobile && isScrollable && left !== 0 && (
        <div className="CategoriesBar__GoLeft" onClick={goLeft}>
          {'<'}
        </div>
      )}
      <Categories
        ref={categoriesRef}
        className="CategoriesBar__Categories"
        categories={props.categories}
        processPath={props.processPath}
      />
      {!isMobile && isScrollable && left !== maxLeft && (
        <div className="CategoriesBar__GoRight" onClick={goRight}>
          {'>'}
        </div>
      )}
    </div>
  );
}

export default CategoriesBar;
