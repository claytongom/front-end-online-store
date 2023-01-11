const ENDPOINT = ' https://api.mercadolibre.com/sites/MLB/';
export async function getCategories() {
  const request = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const response = await request.json();
  return response;
}

export async function getProductsFromCategoryAndQuery(CATEGORY_ID, QUERY) {
  const request = await fetch(`${ENDPOINT}search?${CATEGORY_ID}&q=?${QUERY}`);
  const response = await request.json();
  return response;
}

export async function getProductById() {
  // Esta implementação específica não é avaliada, mas pode ajudar você 🙂
  // Atenção: essa função não deverá ser chamada na tela do carrinho de compras.
}
