import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Pages/Home';
import ShoppingCart from './Pages/ShoppingCart';
import DetailedProduct from './Pages/DetailedProduct';
import Checkout from './Pages/Checkout';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header" />
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route path="/shoppingcart" component={ ShoppingCart } />
        <Route
          path="/product-details/:productID"
          render={ (props) => <DetailedProduct { ...props } /> }
        />
        <Route path="/checkout" component={ Checkout } />
      </Switch>
    </div>
  );
}

export default App;
