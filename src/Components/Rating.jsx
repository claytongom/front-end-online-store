import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function Rating({ productID, savedRatings }) {
  const [inputs, setInputs] = useState({
    email: '',
    rating: '',
    comment: '',
  });
  const [error, setError] = useState(false);
  const [errorMessages, setErrorMessages] = useState('');
  const [ratingList, setRatingList] = useState([]);

  const handleChange = ({ target: { name, value } }) => {
    setInputs({
      ...inputs,
      [name]: value,
    });
    setError(false);
    setErrorMessages('');
  };

  useEffect(() => {
    setRatingList(savedRatings);
    console.log(savedRatings);
  }, [savedRatings]);

  const checkInputs = () => {
    const { email, rating } = inputs;
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    const emailValidation = emailRegex.test(email);
    const ratingValidation = rating !== '';
    const campos = 'Campos inválidos';

    if (!emailValidation) {
      setError(true);
      setErrorMessages(campos);
      return false;
    }

    if (!ratingValidation) {
      setError(true);
      setErrorMessages(campos);
      return false;
    }

    return true;
  };

  const resetInputs = () => {
    setInputs({
      email: '',
      rating: '',
      comment: '',
    });
  };

  const handleClick = (event) => {
    event.preventDefault();
    const inputsSituation = checkInputs();
    console.log(productID);

    if (!inputsSituation) return;
    const { email, rating, comment } = inputs;
    console.log(email, rating, comment);

    const getStorage = JSON.parse(localStorage.getItem(productID));

    if (getStorage === null) {
      localStorage.setItem(productID, JSON.stringify([{
        email,
        rating,
        comment,
      }]));
    } else {
      getStorage.push({
        email,
        rating,
        comment,
      });
      localStorage
        .setItem(productID, JSON.stringify(getStorage));
    }
    setRatingList([...ratingList, {
      email,
      rating,
      comment,
    }]);

    setError(false);
    setErrorMessages('');

    resetInputs();
  };

  const { email, comment } = inputs;

  return (
    <div>
      <h1>Rating</h1>
      <form onSubmit={ handleClick }>
        <input
          data-testid="product-detail-email"
          type="text"
          placeholder="Email"
          value={ email }
          onChange={ handleChange }
          name="email"
        />

        {['one', 'two', 'three', 'four', 'five'].map((star, index) => (
          <input
            key={ Math.random() }
            type="radio"
            name="rating"
            value={ index + 1 }
            data-testid={ `${index + 1}-rating` }
            onChange={ handleChange }
          />
        ))}

        <textarea
          data-testid="product-detail-evaluation"
          placeholder="Comment"
          value={ comment }
          onChange={ handleChange }
          name="comment"
        />

        <button
          data-testid="submit-review-btn"
          type="submit"
        >
          Submit

        </button>
      </form>

      {error && (
        <p data-testid="error-msg">
          {errorMessages}
        </p>
      )}

      {ratingList.length > 0 && (
        <div>
          {ratingList.map((ratings) => (
            <div key={ Math.random() }>
              <p data-testid="review-card-email">
                {ratings.email}
              </p>
              <p data-testid="review-card-rating">
                {ratings.rating}
              </p>
              <p data-testid="review-card-evaluation">
                {ratings.comment}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

Rating.propTypes = {
  productID: PropTypes.string.isRequired,
  savedRatings: PropTypes.arrayOf(PropTypes.shape({
    email: PropTypes.string,
    rating: PropTypes.string,
    comment: PropTypes.string,
  })).isRequired,
};

export default Rating;
