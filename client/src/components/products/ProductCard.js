import React from "react";

export const ProductCard = ({ product }) => {
  return (
    <div className="card rounded-0">
      <img src={ product.images && product.images.url ? product.images.url : '/assets/no-image.png' } className="w-75 m-auto" alt={product.name} />
      <div className="card-body">
        <h3 className="h3">{product.name}</h3>
        <p>{product.description}</p>
        <p>${product.price}</p>
        <div>
          <button className="btn btn-primary btn-sm rounded-0">Buy</button>
        </div>
      </div>
    </div>
  );
};
