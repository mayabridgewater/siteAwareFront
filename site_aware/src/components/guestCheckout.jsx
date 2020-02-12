import React from 'react';

import {guestCheckout} from '../server/user';
import {placeOrder} from '../server/order';

export default class GuestCheckout extends React.Component {
    constructor() {
        super();
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            address: '',
            city: '',
            phone: '',
            ordered: false
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleInput = ({target: {name, value}}) => {
        this.setState({
            [name]: value
        })
    }
    async handleSubmit(e) {
        e.preventDefault();
        const guest = {first_name: this.state.first_name, 
                       last_name: this.state.last_name, 
                       email: this.state.email, 
                       address: this.state.address, 
                       city: this.state.city, 
                       phone: this.state.phone};
        let total = 0;
        for (let i = 0; i < this.props.cart.length; i++) {
            total += this.props.cart[i].total
        }
        const user = await guestCheckout(guest);
        const order = {user_id: user.user_id, usr_details_id: user.id, total: total, items: this.props.cart};
        const ordered = await placeOrder(order);
        this.setState({
            ordered: true
        })
    }
    render() {
        return(
            <div>
                {this.state.ordered ?
                 <h2>Thank you for your order!</h2>
                 :
                <form onSubmit={this.handleSubmit}>
                    <label>First Name:</label>
                    <input type='text' name='first_name' required onChange={this.handleInput}/>

                    <label>Last Name:</label>
                    <input type='text' name='last_name' required onChange={this.handleInput}/>

                    <label>Email:</label>
                    <input type='email' name='email' required onChange={this.handleInput}/>

                    <label>Address:</label>
                    <input type='text' name='address' required onChange={this.handleInput}/>

                    <label>City:</label>
                    <input type='text' name='city' required onChange={this.handleInput}/>

                    <label>Phone:</label>
                    <input type='text' name='phone' onChange={this.handleInput}/>

                    <input type='submit'/>
                </form>
                }
            </div>
        )
    }
}