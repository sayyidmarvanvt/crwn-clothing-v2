import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Category from "../category/category.component";
import { useDispatch } from "react-redux";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import CategoryPreviews from "../categories-preview/categories-preview.component";
import {
  setCategories,
  setLoading,
} from "../../store/categories/category.reducer";

const Shop = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchCategories = async () => {
      dispatch(setLoading(true));
      try {
        const categoriesArray = await getCategoriesAndDocuments();
        dispatch(setCategories(categoriesArray));
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetchCategories();
  }, [dispatch]);
  return (
    <Routes>
      <Route index element={<CategoryPreviews />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
