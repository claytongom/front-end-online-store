/**
 * Fetches API for categories.
 * @CATEGORY_ID {string}
 * @returns TO-DO
 */
export async function getCategories() {
  const request = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const response = await request.json();
  return response;
}
/**
 * Get products from category and query.
 * @CATEGORY_ID {string}
 * @QUERY {string}
 * @returns TO-DO
 */
export async function getProductsFromCategoryAndQuery(CATEGORY_ID, QUERY) {
  const request = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${CATEGORY_ID}&q=${QUERY}`);
  const response = await request.json();
  return response;
}
/**
 * Get product by id.
 * @param {string}
 * @returns TO-DO
 */
export async function getProductById(CATEGORY_ID) {
  // Esta implementação específica não é avaliada, mas pode ajudar você 🙂
  // Atenção: essa função não deverá ser chamada na tela do carrinho de compras.
  const url = `https://api.mercadolibre.com/sites/MLB/search?category=${CATEGORY_ID}}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}
