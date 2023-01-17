import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CartItems from '../Components/CartItems';

class ShoppingCart extends Component {
  state = {
    cartSaved: false,
  };

  componentDidMount() {
    const getSavedCart = JSON.parse(localStorage.getItem('cart'));
    if (getSavedCart !== null && getSavedCart.length > 0) {
      this.setState({ cartSaved: true });
    } else {
      this.setState({ cartSaved: false });
    }
  }

  render() {
    const {
      deleteLocalStorageItem,
      handleDecrease,
      handleSum,
      sum } = this.props;
    const { cartSaved } = this.state;
    return (
      <div>
        <Link data-testid="shopping-cart-button" to="/shoppingcart">Carrinho</Link>
        {!cartSaved ? ( // default is false
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
  deleteLocalStorageItem: PropTypes.func,
  handleDecrease: PropTypes.func,
  handleSum: PropTypes.func,
  sum: PropTypes.string,
};
// Mano próxima vez que for fazer isso avisa onde vai usar props
ShoppingCart.defaultProps = {
  deleteLocalStorageItem: () => { console.log('placeholder'); },
  handleDecrease: () => { console.log('placeholder'); },
  handleSum: () => { console.log('placeholder'); },
  sum: 'teste',
};

export default ShoppingCart;
