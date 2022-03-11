import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/ui/Navbar';
import { ProductsProvider } from '../context/providers/ProductsContext';

export const Layout = () => {
  return (
    <>
        <Navbar />
        <div className='container app'>
            <ProductsProvider>
                <Outlet />
            </ProductsProvider>
        </div>
    </>
  )
}
