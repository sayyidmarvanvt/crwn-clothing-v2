import CategoryPreview from "../../components/category-preview/category-preview.component";
import { useSelector } from "react-redux";
import { selectCategoriesMap } from "../../store/categories/category.selector";

const CategoryPreviews = () => {
  const categories = useSelector(selectCategoriesMap);

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
