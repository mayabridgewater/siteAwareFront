import React from 'react';

import {getDepartments} from '../server/departments';
import {getItemsByDept} from '../server/items';
import Item from './item';

export default class Homepage extends React.Component {
    constructor() {
        super();
        this.state = {
            departments: [],
            items: []
        }
        this.showItems = this.showItems.bind(this)
    }
    async componentDidMount() {
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
    render() {
        return (
            <div>
                <h1>Site Aware Super Market</h1>
                <div className='row'>
                    <div className='col-3'>
                        <h3>Departments:</h3>
                        {this.state.departments.map((dept, d) => (
                            <p key={d} onClick={() => this.showItems(dept.id)}>{dept.label}</p>
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