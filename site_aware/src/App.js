import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Homepage from './components/homepage';
import Cart from './components/cart';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      user: null,
      cart: []
    }
  }
  addToCart = (item) => {
    this.setState({
      cart: [...this.state.cart,
        item]
    })
  }
  deleteFromCart = (id) => {
      const cart = this.state.cart.filter(item => item.id != id);
      this.setState({
        cart
      })
  }
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/cart'>
            <Cart cart={this.state.cart} delete={this.deleteFromCart}/>
          </Route>
          <Route path='/'>
            <Homepage addToCart={this.addToCart} cartLength={this.state.cart.length}/>
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
