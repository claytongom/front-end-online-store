import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ProductCards extends Component {
  render() {
    const { title, thumbnail, price, id } = this.props;
    return (
      <div data-testid="product">
        <Link data-testid="product-detail-link" to={ `/product-details/${id}` }>
          <h3>{title}</h3>
          <img src={ thumbnail } alt={ title } />
          <p>{price}</p>
        </Link>
      </div>
    );
  }
}
ProductCards.propTypes = {
  price: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default ProductCards;
