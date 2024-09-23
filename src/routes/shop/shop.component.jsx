import { Route, Routes } from "react-router-dom";
import CategoryPreviews from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";

const Shop = () => {
  return (
    <Routes>
      <Route index element={<CategoryPreviews />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
