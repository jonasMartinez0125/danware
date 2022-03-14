import React, { useState } from "react";
import { useProducts } from '../../context/providers/ProductsContext';

export const ProductForm = () => {
  const { isLoading, addNewProduct } = useProducts();
  const [product, setproduct] = useState({
    name: '',
    price: 0,
    quantity: 0,
    description: ''
  });

  const handleChange = e => setproduct({ ...product, [e.target.name] : e.target.value })

  const handleSubmit = async(e) => {
    e.preventDefault();
    await addNewProduct(product);
  }

  return (
    <div className="row h-100">
      <div className="col-md-6 offset-md-3 my-auto">
        <form className="card card-body" onSubmit={ handleSubmit }>
          <div className="d-flex justify-content-between align-items-center">
            <h2>Save Product</h2>
            <button className="btn btn-primary" disabled={ !product.name && isLoading }>
              {
                isLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    <span className="ms-2">Loading...</span>
                  </>
                ) :
                <span>Save</span>
              }
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
                value={ product.name }
                onChange={ handleChange }
                autoFocus
              />
              <label htmlFor="price">Price:</label>
              <input
                type="number"
                id="price"
                name="price"
                className="form-control mb-2"
                value={ product.price }
                onChange={ handleChange }
                autoFocus
              />
              <label htmlFor="quantity">Quantity:</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                className="form-control mb-2"
                value={ product.quantity }
                onChange={ handleChange }
                autoFocus
              />
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                name="description"
                rows="2"
                className="form-control"
                value={ product.description }
                onChange={ handleChange }
                autoFocus
              ></textarea>
            </div>
            <div className="col-md-4 my-auto">
              <img src="/assets/no-image.png" alt="" className="img-fluid" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
