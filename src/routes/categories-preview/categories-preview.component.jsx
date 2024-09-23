import { useContext } from "react";

import { CategoriesContext } from "../../context/categories.context";

import CategoryPreview from "../../components/category-preview/category-preview.component";

const CategoryPreviews = () => {
  const { categories } = useContext(CategoriesContext);

  return (
    <>
      {Object.entries(categories).map(([title, items]) => {
        return <CategoryPreview key={title} title={title} products={items} />;
      })}
    </>
  );
};

export default CategoryPreviews;

// {Object.keys(categories).map((title) => {
//   return (
//     <Fragment key={title}>
//       <h1>{title}</h1>
//       <div className="products-container">
//         {categories[title].map(
//           (item, index) =>
//             index < 4 && <ProductCard key={index} product={item} />
//         )}
//       </div>
//     </Fragment>
//   );
// })}
