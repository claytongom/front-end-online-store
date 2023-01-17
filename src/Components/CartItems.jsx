import React, { Component } from 'react';

export default class CartItems extends Component {
  state = {
    cart: [],
  };

  componentDidMount() {
    const getStorage = JSON.parse(localStorage.getItem('cart'));
    this.setState({ cart: getStorage });
  }

  // se o carrinho tiver itens, renderiza o carrinho
  render() {
    const { cart } = this.state;
    return (
      <div>
        {cart.length > 0 && (
          <div>
            <h1>Cart</h1>
            <ul>
              {cart.map((item) => (
                <li key={ item.id }>
                  <p data-testid="shopping-cart-product-name">{item.title}</p>
                  <p>{item.price}</p>
                  <p data-testid="shopping-cart-product-quantity">1</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
}
