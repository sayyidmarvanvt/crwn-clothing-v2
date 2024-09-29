import CategoryPreview from "../../components/category-preview/category-preview.component";
import { useSelector } from "react-redux";
import {
  selectCategoriesIsLoading,
  selectCategoriesMap,
} from "../../store/categories/category.selector";
import Spinner from "../../components/spinner/spinner.component";

const CategoryPreviews = () => {
  const categories = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        Object.entries(categories).map(([title, items]) => {
          return <CategoryPreview key={title} title={title} products={items} />;
        })
      )}
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
