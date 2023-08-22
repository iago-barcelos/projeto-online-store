export type CategoryAndQueryProps = {
  categoryId: string;
  query: string;
};

export async function getCategories() {
  const request = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const response = await request.json();
  return response;
}
export async function getProductsFromCategoryAndQuery(
  { categoryId, query } : CategoryAndQueryProps,
) {
  const request = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`);
  const response = await request.json();
  return response;
}

export async function getProductById(id: string) {
  return fetch(`https://api.mercadolibre.com/items/${id}`).then((r) => r.json());
}
