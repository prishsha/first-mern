import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import './HomePage.css';
import ProductCard from '../components/ProductCard';

const HomePage = ({colorMode}) => {
  const { fetchProducts, products } = useProductStore();

  useEffect(()=>{
    fetchProducts();
  }, [fetchProducts]);

  console.log("products", products);

  return (
    <div className='container'>
      <div className='vstack'>
        <h1 className='page-title'>Current Products</h1>

        <div className='product-grid'>
          {products.map((product)=>(
            <ProductCard key={product._id} product={product} colorMode={colorMode}/>
          ))}
        </div>

        {products.length === 0 && (
          <p className='no-products'>
            No products found {" "}
            <Link to ={"/create"}>
              <span className='create-product-link'>
                Create a product
              </span>
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default HomePage
