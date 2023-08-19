type ShoppingCartProps = {
  cartItems: object[];
};

export default function ShoppingCart({ cartItems }: ShoppingCartProps) {
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
            {cartItems.map((item, index) => (
              <li key={ index }>item</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
