import {Route, Routes} from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import CategoriesPreview from "../categories-preview/categories-preview";
import Category from "../category/category";
import {setCategories} from "../../store/categories/category.action"
import "./shop.scss";
import { getCategories } from "../../store/categories/category.selector";


const Shop = () => {
  const dispatch = useDispatch(); 
  useEffect(()=>{
    const getCategoriesMap = () =>{
      const categoryMap =  getCategories();
      console.log(categoryMap);
      dispatch(setCategories(categoryMap));
    }
    return getCategoriesMap;
  },[])
  return(
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
    )
};

export default Shop;

