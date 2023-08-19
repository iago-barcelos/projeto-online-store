import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getCategories } from '../../services/api';
import './ProductsList.css';

type Categorie = {
  id: string,
  name: string,
};

export function ProductsList() {
  const [categories, setCategories] = useState<Categorie[]>([]);

  useEffect(() => {
    getCategories().then((newCategories) => {
      setCategories(newCategories);
    });
  });

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
      <main>
        {
        categories.length < 1
          ? (
            <p data-testid="home-initial-message">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </p>
          )
          : <p>Listagem</p>
        }
        <div>
          <h2>Categorias:</h2>
          <ul>
            {categories.map(({ name, id }) => (
              <li key={ id }>
                <label htmlFor={ id }>
                  <input
                    type="checkbox"
                    data-testid="category"
                    className="custom-checkbox"
                    name="category"
                    value={ name }
                  />
                  { name }
                  <span className="checkmark" />
                </label>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}
