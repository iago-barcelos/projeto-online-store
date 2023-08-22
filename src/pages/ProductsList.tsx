import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';

type Category = {
  id: string;
  name: string;
};

type Product = {
  id: string;
  title: string;
  thumbnail: string;
  price: number;
  category_id: string;
};

export function ProductsList() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');

  const loadAllProducts = async (categoryId: string) => {
    const response = await getProductsFromCategoryAndQuery({
      categoryId,
      query: searchQuery,
    });

    setProducts(response.results);
  };

  const loadCategories = async () => {
    const newCategories = await getCategories();
    setCategories(newCategories);
  };

  const handleSearch = async () => {
    if (searchQuery.trim() === '') return;

    const response = await getProductsFromCategoryAndQuery({
      categoryId: selectedCategoryId,
      query: searchQuery,
    });
    setProducts(response.results);
  };

  const handleCategoryClick = async (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    await loadAllProducts(categoryId);
  };

  const handleAddToCart = (productId: string) => {
    const productToAdd = products.find((product) => product.id === productId);
    if (productToAdd) {
      const storedCartItems = localStorage.getItem('cartItems');
      const existingCartItems = storedCartItems ? JSON.parse(storedCartItems) : [];
      const updatedCartItems = [...existingCartItems, productToAdd];
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <>
      <header>
        <NavLink to="/carrinho" data-testid="shopping-cart-button">
          Carrinho de Compras
        </NavLink>
        <div>
          <input
            type="text"
            data-testid="query-input"
            value={ searchQuery }
            onChange={ (e) => setSearchQuery(e.target.value) }
          />
          <button type="button" data-testid="query-button" onClick={ handleSearch }>
            Buscar
          </button>
        </div>
      </header>
      <main>
        {products.length < 1 ? (
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
        ) : (
          <ul>
            {products.map(({ id, title, thumbnail, price }) => (
              <li key={ id } data-testid="product">
                <Link
                  key={ id }
                  to={ `/details/${id}` }
                  data-testid="product-detail-link"
                >
                  <img src={ thumbnail } alt={ title } />
                  <p>{title}</p>
                  <p>
                    R$
                    {' '}
                    {price.toFixed(2)}
                  </p>
                </Link>
                <button
                  type="button"
                  data-testid="product-add-to-cart"
                  onClick={ () => handleAddToCart(id) }
                >
                  Adicionar ao carrinho
                </button>
              </li>
            ))}
          </ul>
        )}
        <div>
          <h2>Categorias:</h2>
          <ul>
            {categories.map(({ id, name }) => (
              <li key={ id }>
                <label htmlFor={ id }>
                  <input
                    type="radio"
                    data-testid="category"
                    className="custom-checkbox"
                    name="category"
                    value={ id }
                    onChange={ () => handleCategoryClick(id) }
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
