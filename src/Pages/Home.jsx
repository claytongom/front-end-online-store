import React from 'react';
import { Link } from 'react-router-dom';
import AsideCats from '../Components/AsideCats';

import { getCategories } from '../services/api';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
    };
    this.fetchCategories = this.fetchCategories.bind(this);
  }

  componentDidMount() {
    this.fetchCategories();
  }

  async fetchCategories() {
    const categories = await getCategories();
    this.setState({
      categories,
    });
  }

  render() {
    const { categories } = this.state;
    return (
      <div>
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <input type="text" />
        <Link to="shoppingcart" data-testid="shopping-cart-button">
          <button type="button">
            Carrinho
          </button>
        </Link>
        <aside>
          {categories
            .map((category) => <AsideCats key={ category.id } name={ category.name } />)}
        </aside>
      </div>
    );
  }
}

export default Home;
