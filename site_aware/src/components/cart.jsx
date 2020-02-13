import React from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

import {previousOrders} from '../server/order';
import {getUserInfo} from '../server/user';

export default class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: -1,
            total: '',
            items: this.props.cart,
            previous: [],
            address: []
        }
    }
    async componentDidMount() {
        let total = 0;
        for (let i = 0; i < this.state.items.length; i++) {
            total += this.state.items[i].total
        }
        if (this.props.user) {
            const id = JSON.parse(Cookies.get('login')).id;
            console.log(id)
            // const previous = await previousOrders(id);
            const address = await getUserInfo(id);
        }
        this.setState({
            total
        })
    }
    edit = (id) => {
        this.setState({
            edit: id
        })
    }
    handleInput = ({target: {name, value}}) => {
        let newItem = this.state.items.find(item => item.id = this.state.edit);
        newItem[name] = value;
        const newItems = this.state.items.filter(item => item.id !== this.state.edit);
        newItems.push(newItem);
        this.setState({
            items: newItems
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.update(this.state.items);
        this.setState({
            edit: -1
        })
    }
    render() {
        const {cart} = this.props;
        return (
            <div>
                {cart.length === 0 && 
                    <div>
                        <p>Your cart is empty</p>
                        <Link to='/'>Home</Link>
                    </div>}
                {this.state.total ? 
                    <div className='d-flex justify-content-around'>
                        <p>Total: {this.state.total}</p>
                        {this.props.user ? 
                        <div>
                            <p>Checkout</p>
                        </div>
                            :
                        <div>
                            <Link to='/guest'>Guest Checkout</Link> 
                            <Link to='/register'>Register and Checkout</Link>
                        </div>
                        }
                    </div>
                : ''}
                {cart.map((item, i) => (
                    <div key={i}>
                        <h3>{item.label}</h3>
                        {this.state.edit === item.id ? 
                            <form id={item.id} onSubmit={this.handleSubmit}> 
                                <label>Weight:</label>
                                <input type='number' name='weight' step="0.1" defaultValue={item.weight} onBlur={this.handleInput} required/>
                                <label>Quantity:</label>
                                <input type='number' name='quantity' defaultValue={item.quantity} onBlur={this.handleInput} required/>
                                <label>Comments:</label>
                                <input type='textarea' name='comment' defaultValue={item.comment} onBlur={this.handleInput}/>
                                <input type='submit'/>
                            </form>
                        :
                        <div>
                            <p>Weight: {item.weight}</p>
                            <p>Quantity: {item.quantity}</p>
                            <p>Comments: {item.comment}</p>
                            <p>Total: {item.total}</p>
                            <button onClick={() => this.props.delete(item.id)}>Delete</button>
                            <button onClick={() => this.edit(item.id)}>Edit</button>
                        </div>
                        }
                        {this.props.user &&
                        <div>
                            <p>Choose your shipping address</p>

                        </div>
                        }
                    </div>
                ))}
            </div>
        )
    }
}