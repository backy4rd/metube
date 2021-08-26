import React from 'react';
import { NavLink } from 'react-router-dom';
import { Close } from '@material-ui/icons';

import ICategory from '@interfaces/ICategory';

import './Category.css';

interface CategoryProps {
  category: ICategory;
  to?: string;
  handleRemoveClick?: () => void;
  handleCategoryClick?: () => void;
}

function Category({ category, to, handleRemoveClick, handleCategoryClick }: CategoryProps) {
  const categoryStyle: React.CSSProperties = {
    cursor: handleCategoryClick || to ? 'pointer' : 'default',
  };

  const This = (
    <div className="Category" onClick={handleCategoryClick} style={categoryStyle}>
      {handleRemoveClick && <Close className="Category-RemoveIcon" onClick={handleRemoveClick} />}
      <span>{category.category}</span>
    </div>
  );

  if (!to) return This;
  return (
    <NavLink
      to={to}
      className="Category__Wrapper"
      activeClassName="active"
      isActive={(_, { search, pathname }) => pathname + search === to}
    >
      {This}
    </NavLink>
  );
}

export default Category;
