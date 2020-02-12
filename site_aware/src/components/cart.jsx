import React from 'react';

export default class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: -1,
            user_id: '',
            usr_details_id: '',
            total: '',
            items: [] //id, quantity, weight, comment
        }
    }
    edit = (id) => {
        this.setState({
            edit: id
        })
    }
    render() {
        const {cart} = this.props;
        return (
            <div>
                {cart.map((item, i) => (
                    <div key={i}>
                        <h3>{item.label}</h3>
                        {this.state.edit === item.id ? 
                            <form id={item.id}> 

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
                    </div>
                ))}
            </div>
        )
    }
}