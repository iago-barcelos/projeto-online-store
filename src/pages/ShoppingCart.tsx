import { useEffect, useState } from 'react';
import { getCategories } from '../services/api';

export function ShoppingCart() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getCategories().then((categorie) => setCategories(categorie));
  }, []);
  return (
    <>
      <header>
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
