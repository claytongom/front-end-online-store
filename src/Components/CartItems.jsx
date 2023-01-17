import React, { Component } from 'react';

export default class CartItems extends Component {
  state = {
    cart: [],
    quantity: [],
  };

  componentDidMount() {
    const getStorage = JSON.parse(localStorage.getItem('cart'));
    this.setState({ cart: getStorage });
    if (getStorage.length > 0) {
      const quantity = getStorage.reduce((acc, { id }) => {
        if (acc[id]) {
          acc[id] += 1;
        } else {
          acc[id] = 1;
        }
        return acc;
      }, {});
      this.setState({ quantity });
    }
  }

  handleIncrease = ({ target }) => {
    const { id } = target;
    console.log(id);
    const { cart, quantity } = this.state;
    const newQuantity = { ...quantity };
    newQuantity[id] += 1;
    this.setState({ quantity: newQuantity });
    localStorage.setItem('cart', JSON.stringify(cart));
  };

  handleDecrease = ({ target }) => {
    const { id } = target;
    const { cart, quantity } = this.state;
    const newQuantity = { ...quantity };

    if (newQuantity[id] > 1) {
      newQuantity[id] -= 1;
    } else {
      newQuantity[id] = 1;
    }

    this.setState({ quantity: newQuantity });
    localStorage.setItem('cart', JSON.stringify(cart));
  };

  handleRemove = ({ target }) => {
    const { id } = target;
    const { cart, quantity } = this.state;
    const newCart = cart.filter((item) => item.id !== id);
    const newQuantity = { ...quantity };
    delete newQuantity[id];
    this.setState({ cart: newCart, quantity: newQuantity });
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  // se o carrinho tiver itens, renderiza o carrinho
  render() {
    const { cart, quantity } = this.state;
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

                  <button
                    data-testid="product-increase-quantity"
                    type="button"
                    id={ item.id }
                    onClick={ this.handleIncrease }
                  >
                    +
                  </button>
                  <p data-testid="shopping-cart-product-quantity">
                    {quantity[item.id]}
                  </p>
                  <button
                    data-testid="product-decrease-quantity"
                    type="button"
                    id={ item.id }
                    onClick={ this.handleDecrease }
                  >
                    -
                  </button>

                  <button
                    data-testid="remove-product"
                    type="button"
                    id={ item.id }
                    onClick={ this.handleRemove }
                  >
                    Remover
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
}
