import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Homepage from './components/homepage';

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
      cart: this.state.cart.push(item)
    })
  }
  render() {
    console.log(this.state)
    return (
      <div className="App">
        <Homepage addToCart={this.addToCart}/>
        <Cart cart={this.state.cart}/>
      </div>
    );
  }
}

export default App;
