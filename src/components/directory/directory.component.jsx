import CategoryItem from "../category-item/category-item.component";
import "./directory.styles.scss";

const Diectory = ({ categories }) => {
  return (
    <div className="directory-container">
      {categories.map((category, index) => (
        <CategoryItem key={index} category={category} />
      ))}
    </div>
  );
};

export default Diectory;
