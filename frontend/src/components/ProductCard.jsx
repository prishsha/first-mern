import { useState } from "react";
import { useProductStore } from "../store/product";
import './ProductCard.css';
import { FaEdit, FaTrash} from "react-icons/fa";

const ProductCard = ({product, colorMode}) => {
    const[updatedProduct, setUpdatedProduct] = useState(product);
    
    const {deleteProduct, updateProduct} = useProductStore();

    const [isOpen, setIsOpen] = useState(false);

    const handleDeleteProduct = async (pid) =>{
        const {success, message} = await deleteProduct(pid);
        alert(success ? `Success: ${message}` : `Error: ${message}`);
    };

    const handleUpdateProduct = async (pid, updatedProduct) => {
        const {success, message} = await updateProduct(pid, updatedProduct);
        setIsOpen(false);
        alert(success ? "Product updated successfully" : `Error: ${message}`);
    };

    const onOpen = () => setIsOpen(true);
    const onClose = () => setIsOpen(false);

    return(
        <div className="product-card">
            <img src={product.image} alt={product.name} className="product-image"/>

            <div className="product-details">
                <h3 className="product-title">{product.name}</h3>
                <p className="product-price">${product.price}</p>

                <div className="product-actions">
                    <button className="edit-button" onClick={onOpen}>
                        <FaEdit/>
                    </button>
                    <button className="delete-button" onClick={() => handleDeleteProduct(product._id)}>
                        <FaTrash/>
                    </button>
                </div>
            </div>

            {isOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2 className="modal-title">Update Product</h2>
                        <input 
                            className="input-text"
                            placeholder="Product Name"
                            name="name"
                            value={updatedProduct.name}
                            onChange={(e) => setUpdatedProduct({...updatedProduct, name: e.target.value})}
                        />
                        <input 
                            className="input-text"
                            placeholder="Price"
                            name="price"
                            type="number"
                            value={updatedProduct.price}
                            onChange={(e) => setUpdatedProduct({...updatedProduct, price: e.target.value})}
                        />
                        <input 
                            className="input-text"
                            placeholder="Image URL"
                            name="image"
                            value={updatedProduct.image}
                            onChange={(e) => setUpdatedProduct({...updatedProduct, image: e.target.value})}
                        />
                        <div className="modal-buttons">
                            <button className="modal-button-1" onClick={()=> handleUpdateProduct(product._id, updatedProduct)}>Update</button>
                            <button className="modal-button-2" onClick={onClose}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductCard;