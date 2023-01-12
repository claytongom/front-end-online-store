import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CartItems from '../Components/CartItems';

class ShoppingCart extends Component {
  render() {
    const {
      cartSaved,
      deleteLocalStorageItem,
      handleDecrease,
      handleSum,
      sum } = this.props;
    return (
      <div>
        {!cartSaved ? (
          <p data-testid="shopping-cart-empty-message">
            Seu carrinho está vazio
          </p>
        ) : <CartItems
          cartSaved={ cartSaved }
          deleteLocalStorageItem={ deleteLocalStorageItem }
          handleDecrease={ handleDecrease }
          handleSum={ handleSum }
          sum={ sum }
        />}

        <Link data-testid="checkout-products" to="/checkout">Comprar</Link>

      </div>

    );
  }
}

ShoppingCart.propTypes = {
  cartSaved: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })).isRequired,
  deleteLocalStorageItem: PropTypes.func.isRequired,
  handleDecrease: PropTypes.func.isRequired,
  handleSum: PropTypes.func.isRequired,
  sum: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })).isRequired,
};

export default ShoppingCart;
