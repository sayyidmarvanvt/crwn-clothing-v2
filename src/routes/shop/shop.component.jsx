import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Category from "../category/category.component";
import { useDispatch } from "react-redux";
import CategoryPreviews from "../categories-preview/categories-preview.component";
import {
  fetchCategoriesAsync
} from "../../store/categories/category.action";

const Shop = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategoriesAsync());
  }, [dispatch]);
  return (
    <Routes>
      <Route index element={<CategoryPreviews />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
