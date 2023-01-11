import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <p data-testid="home-initial-message">
        Digite algum termo de pesquisa ou escolha uma categoria.

      </p>
      <Link to="Cart" data-testid="shopping-cart-button">
        <button type="button">
          Carrinho
        </button>
      </Link>
    </div>
  );
}

export default Home;
