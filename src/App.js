import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './Pages/Home';
import ShoppingCart from './Pages/ShoppingCart';
import DetailedProduct from './Pages/DetailedProduct';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header" />
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route path="/shoppingcart" component={ ShoppingCart } />
          <Route
            path="/product-details/:productID"
            render={ (props) => <DetailedProduct { ...props } /> }
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
