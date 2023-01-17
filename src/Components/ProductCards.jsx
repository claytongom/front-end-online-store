import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ProductCards extends Component {
  addToCart = () => {
    const { title, thumbnail, price, id, quantity } = this.props;
    const product = { title, thumbnail, price, id, quantity };
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    const getCartStorage = JSON.parse(localStorage.getItem('cart'));
    const cartLength = getCartStorage.length;

    const cartQuantity = document.querySelector('[data-testid="shopping-cart-size"]');
    cartQuantity.innerText = cartLength;
  };

  render() {
    const { title, thumbnail, price, id } = this.props;
    return (
      <div data-testid="product">
        <Link data-testid="product-detail-link" to={ `/product-details/${id}` }>
          <h3>{title}</h3>
          <img src={ thumbnail } alt={ title } />
          <p>{price}</p>
        </Link>
        <button
          data-testid="product-add-to-cart"
          type="button"
          onClick={ this.addToCart }
          id={ id }
        >
          Adicionar ao carrinho
        </button>
      </div>
    );
  }
}
ProductCards.propTypes = {
  price: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
};

export default ProductCards;
