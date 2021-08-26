import React, { ForwardedRef } from 'react';

import Category from './Category';

import ICategory from '@interfaces/ICategory';

import './Categories.css';

interface CategoriesProps {
  categories: ICategory[];
  processPath?: (c: ICategory) => string;
  handleRemoveCategory?: (c: ICategory) => void;
  handleCategoryClick?: (c: ICategory) => void;
  className?: string;
}

function Categories(
  {
    categories,
    processPath,
    handleRemoveCategory,
    handleCategoryClick,
    className,
  }: CategoriesProps,
  ref?: ForwardedRef<HTMLDivElement>
) {
  return (
    <div ref={ref} className={`Categories ${className ? className : ''}`}>
      {categories.map((category) => (
        <Category
          key={category.id}
          category={category}
          to={processPath && processPath(category)}
          handleCategoryClick={handleCategoryClick && (() => handleCategoryClick(category))}
          handleRemoveClick={handleRemoveCategory && (() => handleRemoveCategory(category))}
        />
      ))}
    </div>
  );
}

export default React.forwardRef<HTMLDivElement, CategoriesProps>(Categories);
