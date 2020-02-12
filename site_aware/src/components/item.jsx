import React from 'react';

export default class Item extends React.Component {
    constructor() {
        super();
        this.state = {
            weight: '',
            comment: ''
        }
    }
    handleInput = ({target: {name, value}}) => {
        this.setState({
            [name]: value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const item = {id: e.target.id, weight: this.state.weight, comment: this.state.comment};
        this.props.addToCart(item)
    }
    render() {
        const {id, label, unit_price} = this.props;
        return(
            <div>
                <h4>{label}</h4>
                <p>{unit_price} / 1 kg</p>
                <div>
                    <form id={id} onSubmit={this.handleSubmit}>
                        <label>Weight:</label>
                        <input type='number' name='weight' step="0.1" onBlur={this.handleInput}/>
                        <label>Comments:</label>
                        <input type='textarea' name='comment' onBlur={this.handleInput}/>
                        <input type='submit'/>
                    </form>
                </div>
            </div>
        )
    }
}