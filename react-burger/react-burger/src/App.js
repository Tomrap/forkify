import React from 'react';
import './App.css';
import Header from './header/Header'
import BurgerController from './BurgerController';
import ShowBurgersController from './showBurgers/ShowBurgersController';
import {BrowserRouter, Route} from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
        <div className="App">
          <Header></Header>
          <Route path="/" exact component={BurgerController} />
          <Route path="/showBurgers" exact component={ShowBurgersController} />
        </div>
    </BrowserRouter>
  );
}

export default App;
