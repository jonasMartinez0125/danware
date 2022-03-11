import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './pages/Layout';
import { HomePage } from "./pages/home/HomePage";
import { ProductForm } from './pages/products/ProductForm';

import './app.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/products/new" element={<ProductForm />} />
          {/* 
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="*" element={<NoMatch />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
