import { createContext, useState, useEffect } from "react";

import {
  // addCollectionAndDocuments,
  getCategoriesAndDocuments,
} from "../utils/firebase/firebase.utils";

// import PRODUCT from "../shop-data";

export const CategoriesContext = createContext({
  categories: {},
});

export const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState({});

  // useEffect(() => {
  //   const setCate = async () => {
  //     await addCollectionAndDocuments("sample", PRODUCT);
  //   };
  //   setCate();
  // });

  useEffect(() => {
    const getCategories = async () => {
      const category = await getCategoriesAndDocuments();
      setCategories(category);
    };

    getCategories();
  }, []);

  const value = { categories, setCategories };
  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
