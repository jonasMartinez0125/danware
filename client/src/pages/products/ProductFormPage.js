import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast';
import { ButtonSpinner } from "../../components/ui/ButtonSpinner";
import { useAuth } from "../../context/providers/AuthContext";
import { useProducts } from "../../context/providers/ProductsContext";

export const ProductFormPage = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const { isLoading, addNewProduct } = useProducts();
  const [product, setproduct] = useState({
    name: "",
    price: 0,
    quantity: 0,
    description: "",
  });
  const [selectedimage, setselectedimage] = useState(null);

  const handleChange = (e) =>
    setproduct({ ...product, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData =  new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("quantity", product.quantity);
    formData.append("description", product.description);
    formData.append("images", selectedimage);
    
    await addNewProduct(formData, token);
    navigate('/');
    toast.success('🚀 New Product added!', {
      position: 'bottom-right'
    });
  };

  return (
    <div className="row h-100">
      <div className="col-md-6 offset-md-3 my-auto">
        <form className="card card-body" onSubmit={handleSubmit}>
          <div className="d-flex justify-content-between align-items-center">
            <h2>Save Product</h2>
            <button
              className="btn btn-primary"
              disabled={!product.name && isLoading}
            >
              {isLoading ? <ButtonSpinner /> : <span>Save</span>}
            </button>
          </div>
          <div className="row">
            <div className="col-md-8">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control mb-2"
                value={product.name}
                onChange={handleChange}
                autoFocus
              />
              <label htmlFor="price">Price:</label>
              <input
                type="number"
                id="price"
                name="price"
                className="form-control mb-2"
                value={product.price}
                onChange={handleChange}
                autoFocus
              />
              <label htmlFor="quantity">Quantity:</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                className="form-control mb-2"
                value={product.quantity}
                onChange={handleChange}
                autoFocus
              />
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                name="description"
                rows="2"
                className="form-control"
                value={product.description}
                onChange={handleChange}
                autoFocus
              ></textarea>
              <label htmlFor="images">Image:</label>
              <input 
                type="file" 
                id="images"
                name="images"
                className="form-control"
                onChange={ e => setselectedimage(e.target.files[0]) }
              />
            </div>
            <div className="col-md-4 my-auto">
              <img src={ selectedimage ? URL.createObjectURL( selectedimage ) : "./assets/no-image.png" } className="img-fluid" alt="" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
