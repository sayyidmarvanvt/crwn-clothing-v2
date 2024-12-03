import { FC } from "react";
import { CategoryItem } from "../../store/categories/category.types";
import ProductCard from "../product-card/product-card.component";
import {
  CategoryPreviewContainer,
  Preview,
  Title,
} from "./category-preview.styles";

type CategoryPreviewProps = {
  title: string;
  products: CategoryItem[];
};

const CategoryPreview: FC<CategoryPreviewProps> = ({ title, products }) => {
  return (
    <CategoryPreviewContainer>
      <h2>
        <Title to={`${title}`}>{title.toUpperCase()}</Title>
      </h2>
      <Preview>
        {products.map(
          (product, index) =>
            index < 4 && <ProductCard key={index} product={product} />
        )}
      </Preview>
    </CategoryPreviewContainer>
  );
};

export default CategoryPreview;
