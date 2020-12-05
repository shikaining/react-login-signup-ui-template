import React, { Component } from "react";
import axios from 'axios';
import ReactDOM from "react-dom";

const INITIAL_STATE = {
    email : "",
    password : "",
    errorMsg: "",
    error: null,
}

export default class Login extends Component {

    constructor(props) {
        super(props);

        this.changeHandler = this.changeHandler.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
         ...INITIAL_STATE,   
         token:'',
        };
    }

    changeHandler = (e) => {
        //bind name
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit = (e) => {
        e.preventDefault();
        const {
            email,
            password,
        } = this.state;

        console.log(email);
        console.log(password);

        axios 
        .post('http://localhost:8888/login', {
            username: email,
            password: password,
        })
        .then(response => {
            console.log(response.data);
            this.setState({token: response.data});
            localStorage.setItem('token', this.state.token);
            this.props.history.push('./sign-up');
        })
        .catch(error => {
            console.log(error);
            this.setState({error});
        });
    }



    render() {
        
        const {
            email,
            password,
            error,
            errorMsg,
        } = this.state;

        //validation
        //if isValid == true then can submit
        const isInvalid =
            password === '' || 
            email === '';

        return (
            <form onSubmit = {this.onSubmit}> 
                <h3>Sign In</h3>

                {/* name must be the same as the variable name to bind */}
                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" value= {email} name="email" onChange={this.changeHandler} className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" value={password} name = "password" onChange={this.changeHandler} placeholder="Enter password" />
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button type="submit" disabled = {isInvalid} className="btn btn-primary btn-block">Submit</button>
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>

                 {/* error is from api, errorMsg is from own validation*/}
                {error && <p className="error">{error.message}</p>}
                <p className="error">{errorMsg}</p>
            </form>
        );
    }
}

ReactDOM.render(
    <Login/>,
    document.getElementById('root')
);
