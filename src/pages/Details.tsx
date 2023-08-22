import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getProductById } from '../services/api';

type Product = {
  id: string,
  title: string,
  thumbnail: string,
  price: number,
};

export function Details() {
  const [product, setProduct] = useState<Product>({} as Product);
  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    async function fetchData() {
      try {
        if (id) {
          const response = await getProductById(id);
          setProduct(response);
        }
      } catch (error) {
        console.error('error', error);
      }
    }
    fetchData();
  }, [id]);
  return (
    <div>
      <img
        src={ product.thumbnail }
        alt={ product.title }
        data-testid="product-detail-image"
      />
      <p data-testid="product-detail-name">{product.title}</p>
      <p data-testid="product-detail-price">
        R$
        {' '}
        {product.price}
      </p>
      <Link to="/carrinho" data-testid="shopping-cart-button">Ir para o Carrinho</Link>
    </div>

  );
}
