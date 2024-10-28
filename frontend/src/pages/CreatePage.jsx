import React from 'react'
import { useState } from 'react';
import '../pages/CreatePage.css'
import { useProductStore } from '../store/product';

const CreatePage = () =>{
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const {createProduct } = useProductStore()

  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);
    if(!success)
    {
      alert(`Error: ${message}`);
    }
    else
    {
      alert(`Success: ${message}`);
      console.log("Success" , message);
    }
    setNewProduct({name: "", price: "", image:""});
  };

  return (
    <div className='create-page'>
      <h1>Create New Product</h1>
      <div className='form-container'>
        <div className='input-group'>
          <input 
            type="text" 
            placeholder="Product Name" 
            value={newProduct.name} 
            onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
          />

          <input 
            type="number"
            placeholder='Price'
            value={newProduct.price}
            onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
          />

          <input
            type="text"
            placeholder='Image URL'
            value={newProduct.image}
            onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
          />

          <button onClick={handleAddProduct}>Add Product</button>
        </div>
      </div>
    </div>
  );
};

export default CreatePage
