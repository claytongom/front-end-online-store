import React from 'react';
import { Link } from 'react-router-dom';
import AsideCats from '../Components/AsideCats';
import ProductCards from '../Components/ProductCards';
import {
  getProductsFromCategoryAndQuery,
  getCategories,
} from '../services/api';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: '',
      categoriesList: [],
      categoryID: '',
      productsList: [],
      loaded: true,
      quantityCart: 0,
    };

    this.fetchCategories = this.fetchCategories.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleCategoryClick = this.handleCategoryClick.bind(this);
  }

  componentDidMount() {
    this.fetchCategories();
    const getCartStorage = JSON.parse(localStorage.getItem('cart'));
    if (getCartStorage !== null) {
      this.setState({
        quantityCart: getCartStorage,
      });
    } else {
      this.setState({
        quantityCart: [],
      });
    }
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleCategoryClick({ target: { value, checked } }) {
    if (checked) {
      this.setState(
        { categoryID: value },
        () => {
          this.fetchProductByCatID();
        },
      );
    }
  }

  /**
  * Captura o valor do input e usa este valor como query da API
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

  async fetchProductByCatID() {
    const { searchQuery, categoryID } = this.state;
    const data = await getProductsFromCategoryAndQuery(searchQuery, categoryID);
    this.setState({ productsList: data.results });
    console.log(data.results);
  }

  async fetchCategories() {
    const categoriesList = await getCategories();
    this.setState({
      categoriesList,
    });
  }

  render() {
    const { categoriesList, loaded, productsList, quantityCart } = this.state;
    return (
      <div>

        <input
          type="text"
          data-testid="query-input"
          name="searchQuery"
          onChange={ this.handleChange }
        />
        <button type="button" data-testid="query-button" onClick={ this.handleSearch }>
          Pesquisar
        </button>
        <Link to="shoppingcart" data-testid="shopping-cart-button">
          <button type="button">
            Carrinho
          </button>
        </Link>
        <span data-testid="shopping-cart-size">
          {quantityCart.length === 0 ? '2' : '2'}
        </span>
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
                  id={ el.id }
                  quantity={ el.available_quantity }
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
          {categoriesList
            .map((category) => (<AsideCats
              key={ category.id }
              name={ category.name }
              handleCategoryClick={ this.handleCategoryClick }
              id={ category.id }
            />))}
        </aside>
      </div>
    );
  }
}
export default Home;
