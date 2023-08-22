import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../../services/api';
import './ProductsList.css';

type Categorie = {
  id: string,
  name: string,
};

 type Product = {
   id: string,
   title: string,
   thumbnail: string,
   price: number,
 };

export function ProductsList() {
  const [categories, setCategories] = useState<Categorie[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');

  useEffect(() => {
    getCategories().then((newCategories) => {
      setCategories(newCategories);
    });
  }, []);

  const handleSearch = async () => {
    if (searchQuery.trim() === '') return;

    const response = await getProductsFromCategoryAndQuery({
      categoryId: '',
      query: searchQuery,
    });

    setProducts(response.results);
  };

  const handleCategoryClick = async (categoryId: string) => {
    const response = await getProductsFromCategoryAndQuery({
      categoryId,
      query: '',
    });

    setSelectedCategoryId(categoryId);
    setProducts(response.results);
  };

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
          <input
            type="text"
            data-testid="query-input"
            value={ searchQuery }
            onChange={ (e) => setSearchQuery(e.target.value) }
          />
          <button
            type="button"
            data-testid="query-button"
            onClick={ handleSearch }
          >
            Buscar
          </button>
        </div>
      </header>
      <main>
        {
          products.length < 1
            ? (
              <p data-testid="home-initial-message">
                Digite algum termo de pesquisa ou escolha uma categoria.
              </p>
            )
            : (
              <ul>
                {products.map(({ id, title, thumbnail, price }) => (
                  <Link
                    key={ id }
                    to={ `/details/${id}` }
                    data-testid="product-detail-link"
                  >
                    <li key={ id } data-testid="product">
                      <img src={ thumbnail } alt={ title } />
                      <p>{title}</p>
                      <p>
                        R$
                        {' '}
                        {price.toFixed(2)}
                      </p>
                    </li>
                  </Link>
                ))}
              </ul>
            )
        }
        <div>
          <h2>Categorias:</h2>
          <ul>
            {categories.map(({ id, name }) => (
              <li key={ id }>
                <label htmlFor={ id }>
                  <input
                    type="checkbox"
                    data-testid="category"
                    className="custom-checkbox"
                    name="category"
                    value={ name }
                    onClick={ () => handleCategoryClick(id) }
                    checked={ selectedCategoryId === id }
                  />
                  {name}
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
