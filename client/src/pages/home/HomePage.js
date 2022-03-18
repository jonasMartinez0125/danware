import React from "react";
import { useAuth } from "../../context/providers/AuthContext";
import { useProducts } from "../../context/providers/ProductsContext";

import { Hero } from "../../components/ui/Hero";
import { Spinner } from "../../components/ui/Spinner";
import { ProductCard } from "../../components/products/ProductCard";

export const HomePage = () => {
  const { isLoggedIn } = useAuth();
  const { isLoading, products } = useProducts();

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className="row">
      <Hero />

      {
        isLoggedIn && (
          products.map((product) => (
            <div key={product._id}  className="col-md-3 p-2">
              <ProductCard product={product} />
            </div>
          ))
        )
      }
    </div>
  );
};
