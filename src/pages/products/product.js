import { Routes, Route } from 'react-router-dom';
import ProductHome from './home';
import AddUpdate from './add-update';
import ProductDetail from './detail';

function Product() {
  return (
    <Routes>
      <Route index element={<ProductHome />} />
      <Route path="addUpdate" element={<AddUpdate />} />
      <Route path="detail/:id" element={<ProductDetail />} />
    </Routes>
  )
}

export default Product;
