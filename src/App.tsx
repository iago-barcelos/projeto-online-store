import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import { ProductsList } from './pages/ProductsList/ProductsList';
import ShoppingCart from './pages/ShoppingCart';
import { Details } from './pages/Details';

function App() {
  const [cartItems/* ,setCarItems */] = useState([]); // descomentar o setCarItems quando for utilizá-lo

  return (
    <Routes>
      <Route path="/" element={ <ProductsList /> } />
      <Route path="/carrinho" element={ <ShoppingCart cartItems={ cartItems } /> } />
      <Route path="/details/:id" element={ <Details /> } />
    </Routes>
  );
}
export default App;
