import { selectCategory } from "../../store/categories/category.selector";
import { useSelector } from "react-redux";
import CategoryPreview from "../../components/category-preview/category-preview";

const CategoriesPreview = () => {
  const categoriesMap = useSelector(selectCategory)
  return (
    <>
      {Object.keys(categoriesMap).map((title)=> {
        const products = categoriesMap[title];
        return(
          <CategoryPreview key={title} title={title} products={products}/>
        )
      })}
    </>
  );
};

export default CategoriesPreview;
