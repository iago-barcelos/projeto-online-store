import { Route, Routes } from 'react-router-dom';
import ProductsList from './pages/ProductsList';
import ShoppingCart from './pages/ShoppingCart';
import Details from './pages/Details';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <ProductsList /> } />
      <Route path="/carrinho" element={ <ShoppingCart /> } />
      <Route path="/details/:id" element={ <Details /> } />
    </Routes>
  );
}

export default App;
