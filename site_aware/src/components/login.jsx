import React from 'react';
import Cookies from 'js-cookie'

import {login} from '../server/user';

export default class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            error: false
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
        const data = {email: this.state.email, password: this.state.password};
        const user = await login(data);
        if (user.length > 0) {
            this.props.login();
            window.location.replace('/')
        }else {
            this.setState({
                error: true
            })
        }

    }
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Email: </label>
                    <input type='email' name='email' onChange={this.handleInput} required/>

                    <label>Password: </label>
                    <input type='password' name='password' onChange={this.handleInput} required/>

                    <input type='submit'/>
                </form>
                {this.state.error && <p>User Not Found</p>}
            </div>
        )
    }
}