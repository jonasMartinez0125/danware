import React, { useContext } from "react";
import { Hero } from "../../components/ui/Hero";
import { Spinner } from "../../components/ui/Spinner";
import { ProductsContext } from "../../context/providers/ProductsContext";

export const HomePage = () => {
  const { isLoading, products } = useContext(ProductsContext);

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className="row">
      <Hero />

      {products.map((product) => (
        <div key={product._id}  className="col-md-4">
          <div className="card card-body">
            <h3>{product.name}</h3>
            <p>{product.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
