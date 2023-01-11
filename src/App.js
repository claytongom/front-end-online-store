import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './Components/Home';

function App() {
  return (
    <div className="App">
      <header className="App-header" />
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Home } />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
