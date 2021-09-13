import React, { useEffect, useState } from 'react';

import ICategory from '@interfaces/ICategory';
import categoryApi from '@api/categoryApi';

const CategoriesContext = React.createContext<Array<ICategory>>([]);

export function useCategories() {
  return React.useContext(CategoriesContext);
}

interface CategoriesProviderProps {
  children: React.ReactNode;
}

export function CategoriesProvider(props: CategoriesProviderProps) {
  const [categories, setCategories] = useState<Array<ICategory>>([]);

  useEffect(() => {
    categoryApi.getCategories().then(setCategories);
  }, []);

  return (
    <CategoriesContext.Provider value={categories}>{props.children}</CategoriesContext.Provider>
  );
}

