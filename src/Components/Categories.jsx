import React from 'react';
import { getCategories } from '../services/api';

class Categories extends React.Component {
  state = {
    categories: [],
  };

  componentDidMount() {
    this.getCategories();
  }

  getCategories = async () => {
    const categories = await getCategories();
    this.setState({ categories });
  };

  render() {
    const { categories } = this.state;
    return (
      <div>
        {categories.map((category) => (

          <button
            type="button"
            key={ category.id }
            data-testid="category"
          >
            {category.name}
          </button>
        ))}
      </div>
    );
  }
}

export default Categories;
