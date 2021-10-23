import React from 'react';
import { Menu } from '@mui/material';

import ICategory from '@interfaces/ICategory';
import { useCategories } from '@contexts/CategoriesContext';

import Categories from '@components/Categories';

import './CategorySelector.css';

interface CategoriesSelectorProps {
  categories: Array<ICategory>;
  setCategories: React.Dispatch<React.SetStateAction<Array<ICategory>>>;
}

function CategoriesSelector({ categories, setCategories }: CategoriesSelectorProps) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const allCategories = useCategories();

  function handleSelectCategory(e: React.MouseEvent<HTMLDivElement>) {
    setAnchorEl(null);
    const category = allCategories.find((c) => c.category === e.currentTarget.innerText);
    if (categories.find((c) => c.category === category?.category)) return;
    setCategories([category!, ...categories]);
  }

  function handleRemoveCategory(category: ICategory) {
    setCategories(categories.filter((c) => c !== category));
  }

  function handleAnchorClick(e: React.MouseEvent<HTMLSelectElement>) {
    e.preventDefault();
    setAnchorEl(e.currentTarget);
  }

  return (
    <div className="CategoriesSelector">
      <select className="CategoriesSelector-Anchor" onMouseDown={handleAnchorClick}>
        <option>Chọn chủ đề video</option>
      </select>
      <Menu
        classes={{ list: 'CategoriesSelector__Menu' }}
        open={anchorEl !== null}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {allCategories.map((category) => (
          <div key={category.id} onClick={handleSelectCategory}>
            {category.category}
          </div>
        ))}
      </Menu>

      <Categories categories={categories} handleRemoveCategory={handleRemoveCategory} />
    </div>
  );
}

export default CategoriesSelector;
