import React from 'react';
import propTypes from 'prop-types';

class AsideCats extends React.Component {
  render() {
    const { name, id } = this.props;
    return (
      <div>
        <label htmlFor={ id }>
          <input
            name="category"
            type="radio"
            value={ name }
            data-testid="category"
          />
          {name}
        </label>
      </div>
    );
  }
}

export default AsideCats;

AsideCats.propTypes = {
  name: propTypes.string,
  id: propTypes.string,
};

AsideCats.defaultProps = {
  name: 'genericName',
  id: 'genericID',
};
