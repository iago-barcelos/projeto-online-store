import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import { ProductsList } from './pages/ProductsList/ProductsList';
import ShoppingCart from './pages/ShoppingCart';

function App() {
  const [cartItems/* ,setCarItems */] = useState([]); // descomentar o setCarItems quando for utilizá-lo

  return (
    <Routes>
      <Route path="/" element={ <ProductsList /> } />
      <Route path="/carrinho" element={ <ShoppingCart cartItems={ cartItems } /> } />
    </Routes>
  );
}
export default App;
