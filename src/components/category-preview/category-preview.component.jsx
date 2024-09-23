import { Link } from "react-router-dom";
import ProductCard from "../product-card/product-card.component";
import "./category-preview.styles.scss";

const CategoryPreview = ({ title, products }) => {
  return (
    <div className="category-preview-container">
      <h2>
        <Link to={`${title}`} className="title">
          {title.toUpperCase()}
        </Link>
      </h2>
      <div className="preview">
        {products.map(
          (product, index) =>
            index < 4 && <ProductCard key={index} product={product} />
        )}
      </div>
    </div>
  );
};

export default CategoryPreview;
