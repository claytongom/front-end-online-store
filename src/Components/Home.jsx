import React from 'react';
import { Link } from 'react-router-dom';
import Categories from './Categories';

function Home() {
  return (
    <div>
      <p data-testid="home-initial-message">
        Digite algum termo de pesquisa ou escolha uma categoria.

      </p>
      <Link to="ShoppingCart" data-testid="shopping-cart-button">
        <button type="button">
          Carrinho
        </button>
      </Link>
      <Categories />
    </div>
  );
}

export default Home;
