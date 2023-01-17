import React, { useEffect, useState } from 'react';

function Checkout() {
  const [cart, setCart] = useState([]);
  const [inputs, setInputs] = useState({
    fullName: '',
    email: '',
    cpf: '',
    phone: '',
    cep: '',
    address: '',
  });
  const [radio, setRadio] = useState(''); // [ticket, visa, mastercard, elo
  const [error, setError] = useState({
    errors: false,
    message: '',
  });

  useEffect(() => {
    const cartx = JSON.parse(localStorage.getItem('cart'));
    setCart(cartx);
  }, []);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setInputs({ ...inputs, [name]: value });
    setError({ errors: false, message: '' });
    console.log(radio);
    if (target.type === 'radio') {
      setRadio(value);
    }
  };

  const verifyInputs = () => {
    const { fullName, email, cpf, phone, cep, address } = inputs;

    if (!fullName || !email || !cpf || !phone || !cep || !address || !radio) {
      setError({ errors: true, message: 'Campos inválidos' });
      return false;
    }
    setError({ errors: false, message: '' });
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const verify = verifyInputs();
    if (!verify) return;
    localStorage.clear();
    setCart([]);
    setError({ errors: false, message: '' });
    setInputs({
      fullName: '',
      email: '',
      cpf: '',
      phone: '',
      cep: '',
      address: '',
    });
  };

  return (
    <div>
      <h1>Checkout</h1>
      {cart.length > 0 && (
        cart.map((item) => (
          <div key={ item.id }>
            <h3>{item.title}</h3>
            <p>{item.price}</p>
          </div>
        ))
      )}

      <form onSubmit={ handleSubmit }>
        <input
          type="text"
          placeholder="Nome"
          name="fullName"
          data-testid="checkout-fullname"
          onChange={ handleChange }
        />
        <input
          type="text"
          placeholder="E-mail"
          name="email"
          data-testid="checkout-email"
          onChange={ handleChange }
        />
        <input
          type="text"
          placeholder="CPF"
          name="cpf"
          data-testid="checkout-cpf"
          onChange={ handleChange }
        />
        <input
          type="text"
          placeholder="Phone"
          name="phone"
          data-testid="checkout-phone"
          onChange={ handleChange }
        />
        <input
          type="text"
          placeholder="CEP"
          name="cep"
          data-testid="checkout-cep"
          onChange={ handleChange }
        />
        <input
          type="text"
          placeholder="Address"
          name="address"
          data-testid="checkout-address"
          onChange={ handleChange }
        />
        <label htmlFor="ticket-payment">
          <input
            type="radio"
            data-testid="ticket-payment"
            name="mesmoName"
            value="ticket"
            onChange={ handleChange }
          />
          Boleto

        </label>

        <label htmlFor="visa-payment">
          <input
            type="radio"
            data-testid="visa-payment"
            name="mesmoName"
            value="visa"
            onChange={ handleChange }
          />
          Visa

        </label>

        <label htmlFor="mastercard-payment">
          <input
            type="radio"
            data-testid="master-payment"
            name="mesmoName"
            value="mastercard"
            onChange={ handleChange }
          />
          Mastercard

        </label>

        <label htmlFor="elo-payment">
          <input
            type="radio"
            data-testid="elo-payment"
            name="mesmoName"
            value="elo"
            onChange={ handleChange }
          />
          Elo

        </label>

        <button
          type="submit"
          data-testid="checkout-btn"
        >
          Finalizar Compra
        </button>
      </form>
      {error.errors && (
        <p data-testid="error-msg">
          {error.message}
        </p>
      )}
    </div>
  );
}

export default Checkout;
