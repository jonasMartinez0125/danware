import React from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from 'react-hot-toast';

import { Navbar } from "../components/ui/Navbar";
import { AuthProvider } from "../context/providers/AuthContext";
import { ProductsProvider } from "../context/providers/ProductsContext";

export const Layout = () => {
  return (
    <>
      <AuthProvider>
        <Navbar />
        <div className="container app">
          <ProductsProvider>
            <Outlet />
          </ProductsProvider>
        </div>
        <Toaster />
      </AuthProvider>
    </>
  );
};
