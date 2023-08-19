import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getCategories } from '../services/api';

export function ProductsList() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getCategories().then((categorie) => setCategories(categorie));
  }, []);
  return (
    <>
      <header>
        <NavLink
          to="/carrinho"
          data-testid="shopping-cart-button"
        >
          Carrinho de Compras
        </NavLink>
        <div>
          <input type="text" />
        </div>
      </header>
      {
        categories.length < 1
          ? (
            <p data-testid="home-initial-message">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </p>
          )
          : <p>Listagem</p>
      }
    </>
  );
}
