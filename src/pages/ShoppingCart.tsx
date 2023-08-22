import { useEffect, useState } from 'react';
import { ProductType } from '../types';

export default function ShoppingCart() {
  const [cartItems, setCartItems] = useState<ProductType[]>([]);

  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      const parsedCartItems: ProductType[] = JSON.parse(storedCartItems);
      setCartItems(parsedCartItems);
    }
  }, []);

  const getProductQuantity = (productId: string) => {
    const matchingItems = cartItems.filter((item) => item.id === productId);
    return matchingItems.length;
  };

  const getUniqueCartItems = () => {
    const uniqueCartItems: ProductType[] = [];
    cartItems.forEach((item) => {
      if (!uniqueCartItems.some((uniqueItem) => uniqueItem.id === item.id)) {
        uniqueCartItems.push(item);
      }
    });
    return uniqueCartItems;
  };

  return (
    <div>
      <header>
        <div>
          <input type="text" />
        </div>
      </header>
      {cartItems.length < 1 ? (
        <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
      ) : (
        <>
          <h1>Seu Carrinho de Compras</h1>
          <ul>
            {getUniqueCartItems().map((item) => (
              <li key={ item.id } data-testid="shopping-cart-product-name">
                <p>{item.title}</p>
                <p data-testid="shopping-cart-product-price">
                  R$
                  {' '}
                  {item.price}
                </p>
                <p data-testid="shopping-cart-product-quantity">
                  Quantidade:
                  {getProductQuantity(item.id)}
                </p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
