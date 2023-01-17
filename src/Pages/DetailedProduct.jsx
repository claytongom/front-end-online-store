import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductById } from '../services/api';
import Rating from '../Components/Rating';

class DetailedProduct extends React.Component {
  constructor() {
    super();
    this.state = {
      product: {},
      path: '',
      savedProducts: [],
      quantityCart: 0,
    };
    this.getProductId = this.getProductId.bind(this);
  }

  componentDidMount() {
    this.getProductId();
    const { match: { params: { productID } } } = this.props;
    const getStorage = JSON.parse(localStorage.getItem(productID)) || [];
    const getCartStorage = JSON.parse(localStorage.getItem('cart')) || [];
    this.setState({
      path: productID,
      savedProducts: getStorage,
      quantityCart: getCartStorage.length,
    });
  }

  async getProductId() {
    const { match: { params: productID } } = this.props;
    const response = await getProductById(productID.productID);
    this.setState({
      product: response,
    });
  }

  addToCart = () => {
    const { product: { title, price, thumbnail } } = this.state;
    const product = { title, price, thumbnail };
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    const getCartStorage = JSON.parse(localStorage.getItem('cart'));
    const cartLength = getCartStorage.length;

    const cartQuantity = document.querySelector('[data-testid="shopping-cart-size"]');
    cartQuantity.innerText = cartLength;
  };

  render() {
    const { product: { title, thumbnail, price },
      path, savedProducts, quantityCart } = this.state;
    return (
      <>
        <Link to="/">
          <button type="button">Home</button>
        </Link>
        <div>
          <h2 data-testid="product-detail-name">{title}</h2>
          <img data-testid="product-detail-image" src={ thumbnail } alt={ title } />
          <p data-testid="product-detail-price">{price}</p>
          <Link to="/shoppingcart">
            <button type="button" data-testid="shopping-cart-button">Carrinho</button>
          </Link>
          <span data-testid="shopping-cart-size">{quantityCart}</span>
          <button
            type="button"
            data-testid="product-detail-add-to-cart"
            onClick={ this.addToCart }
          >
            Adicionar ao carrinho
          </button>

          <Rating
            productID={ path }
            savedRatings={ savedProducts }
          />
        </div>
      </>
    );
  }
}

DetailedProduct.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      productID: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default DetailedProduct;
