import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Homepage from './components/homepage';
import Cart from './components/cart';
import GuestCheckout from './components/guestCheckout';
import Register from './components/register';
import Login from './components/login';

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
      const cart = this.state.cart.filter(item => item.id !== id);
      this.setState({
        cart
      })
  }
  updateCart = (items) => {
    this.setState({
      cart: items
    })
  }
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/cart'>
            <Cart cart={this.state.cart} delete={this.deleteFromCart} update={this.updateCart}/>
          </Route>
          <Route path='/guest'>
            <GuestCheckout cart={this.state.cart}/>
          </Route>
          <Route path='/register'>
            <Register cart={this.state.cart}/>
          </Route>
          <Route path='/login'>
            <Login/>
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
