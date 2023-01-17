import React, { Component } from 'react';

export default class CartItems extends Component {
  state = {
    cart: [],
    quantitye: [],
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
      this.setState({ quantitye: quantity });
    }
  }

  handleIncrease = ({ target }) => {
    const { id } = target;
    const { cart, quantitye } = this.state;
    const newQuantity = { ...quantitye };
    // find by id
    const item = cart.find((items) => items.id === id);
    console.log(item.quantity);
    console.log(newQuantity[id]);

    if (newQuantity[id] < item.quantity) {
      newQuantity[id] += 1;
    } else {
      newQuantity[id] = item.quantity;
    }
    this.setState({ quantitye: newQuantity });
    localStorage.setItem('cart', JSON.stringify(cart));
  };

  handleDecrease = ({ target }) => {
    const { id } = target;
    const { cart, quantitye } = this.state;
    const newQuantity = { ...quantitye };
    console.log(newQuantity[id]);

    if (newQuantity[id] > 1) {
      newQuantity[id] -= 1;
    } else {
      newQuantity[id] = 1;
    }

    this.setState({ quantitye: newQuantity });
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
    const { cart, quantitye } = this.state;
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
                    {quantitye[item.id]}
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
