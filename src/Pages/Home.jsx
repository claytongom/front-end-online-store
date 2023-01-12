import React from 'react';
import { Link } from 'react-router-dom';
import AsideCats from '../Components/AsideCats';
import { getProductsFromCategoryAndQuery, getCategories } from '../services/api';
import ProductCards from '../Components/ProductCards';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      searchQuery: '',
      loaded: true,
      productsList: [],
    };

    this.fetchCategories = this.fetchCategories.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    this.fetchCategories();
  }

  handleChange({ target }) {
    const { value } = target;
    this.setState({
      searchQuery: value,
    });
  }

  /**
   * Capturar o valor do input e usa este valor como busca do query da API
  */
  handleSearch = async () => {
    const { searchQuery } = this.state;
    const categoriesId = '';
    const request = await getProductsFromCategoryAndQuery(categoriesId, searchQuery);
    if (!request.results.length >= 1) {
      this.setState({
        loaded: false,
      });
    } else {
      this.setState({
        productsList: request.results,
        loaded: true,
      });
    }
  };

  async fetchCategories() {
    const categories = await getCategories();
    this.setState({
      categories,
    });
  }

  render() {
    const { categories, loaded, productsList } = this.state;
    return (
      <div>

        <input type="text" data-testid="query-input" onChange={ this.handleChange } />
        <button type="button" data-testid="query-button" onClick={ this.handleSearch }>
          Pesquisar
        </button>
        <Link to="shoppingcart" data-testid="shopping-cart-button">
          <button type="button">
            Carrinho
          </button>
        </Link>
        {
          loaded ? (
            <div>
              <p data-testid="home-initial-message">
                Digite algum termo de pesquisa ou escolha uma categoria.
              </p>
              {' '}
              {
                productsList.map((el) => (<ProductCards
                  data-testid="product"
                  price={ el.price }
                  title={ el.title }
                  thumbnail={ el.thumbnail }
                  key={ el.id }
                />
                ))
              }
            </div>
          ) : (
            <span data-testid="home-initial-message">
              Nenhum produto foi encontrado
            </span>
          )
        }
        <aside>
          {categories
            .map((category) => <AsideCats key={ category.id } name={ category.name } />)}
        </aside>
      </div>
    );
  }
}
export default Home;
