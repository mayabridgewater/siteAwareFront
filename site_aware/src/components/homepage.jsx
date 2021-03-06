import React from 'react';
import Cookies from 'js-cookie';

import {getDepartments} from '../server/departments';
import {getItemsByDept} from '../server/items';
import Item from './item';
import { Link } from 'react-router-dom';

export default class Homepage extends React.Component {
    constructor() {
        super();
        this.state = {
            departments: [],
            items: [],
            loggedIn: false
        }
        this.showItems = this.showItems.bind(this)
    }
    async componentDidMount() {
        if (Cookies.get('login')) {
            this.setState({
                loggedIn: true
            })
        }
        const departments = await getDepartments();
        this.setState({
            departments
        })
    }
    async showItems(id) {
        const items = await getItemsByDept(id);
        this.setState({
            items
        })
    }
    logout = () => {
        this.props.logout();
        this.setState({
            loggedIn: false
        })
    } 
    render() {
        return (
            <div>
                <div className='d-flex justify-content-around'>
                    <h1>Site Aware Super Market</h1>
                    <Link to='/cart'>Cart {this.props.cartLength} items</Link>
                    {this.state.loggedIn ? 
                    <p onClick={this.logout}>Log Out</p>
                    :
                    <Link to='/login'>Login to Checkout</Link>}
                </div>
                <div className='row'>
                    <div className='col-3'>
                        <h3>Departments:</h3>
                        {this.state.departments.map((dept, d) => (
                            <p key={d} style={{cursor: 'pointer'}} onClick={() => this.showItems(dept.id)}>{dept.label}</p>
                        ))}
                    </div>
                    <div className='col-9'>
                        {this.state.items.map((item, i) => (
                            <Item {...item} key={i} addToCart={this.props.addToCart}/>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}