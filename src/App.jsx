import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MenuPage from './pages/MenuPage';
import CartPage from './pages/CartPage';
import OrderSuccess from './pages/OrderSuccess';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MenuPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/success" element={<OrderSuccess />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;