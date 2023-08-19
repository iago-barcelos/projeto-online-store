import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getCategories } from '../services/api';

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
        <div>
          <h2>Categorias:</h2>
          <ul style={ { listStyle: 'none' } }>
            {categories.map(({ name, id }) => (
              <li key={ id }>
                <input type="radio" data-testid="category" name={ name } value={ name } />
                <label htmlFor={ name }>{ name }</label>
              </li>
            ))}
          </ul>
        </div>
        {
        categories.length < 1
          ? (
            <p data-testid="home-initial-message">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </p>
          )
          : <p>Listagem</p>
        }
      </main>
    </>
  );
}
