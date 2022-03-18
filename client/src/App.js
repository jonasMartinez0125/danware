import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './app.css';

import { Layout } from './pages/Layout';
import { HomePage } from "./pages/home/HomePage";
import { Signup } from './pages/auth/Signup';
import { Signin } from './pages/auth/Signin';
import { ProductFormPage } from './pages/products/ProductFormPage';
import { CartPage } from './pages/cart/CartPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path='/auth/signup' element={<Signup />} />
          <Route path='/auth/signin' element={<Signin />} />
          <Route path="/products/new" element={<ProductFormPage />} />
          <Route path='/cart' element={<CartPage />} />
          {/* 
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="*" element={<NoMatch />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
