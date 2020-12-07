import React, { useState } from 'react';
import '../App.css';
import ExtendSession from './ExtendSession.component';

function Login(props) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const url = "http://expressbackend-env.eba-mmzyvbbv.us-east-1.elasticbeanstalk.com/login"

    function loginHandler(e) {
        e.preventDefault();
        console.log("fetching token.. ");

        fetch(url, {
            method: 'POST',
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
            .then((res) => {
                return res.text();
            })
            .then((data) => {
                window.localStorage.setItem("Auth-Token", data);
                window.localStorage.setItem("expiryDate", new Date(new Date().getTime() + 10 * 60 * 1000));

                console.log("Done! Token: " + data);
                props.history.push("/register");
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <>
        <ExtendSession/>
        <form>
            <h3>Login Now!</h3>
            <div className="form-group">
                <label>Username</label>
                <input type="text" value={username} name="username"
                    className="form-control" placeholder="Enter username"
                    onChange={(e) => {
                        setUsername(e.target.value);
                    }} />
            </div>
            <div className="form-group">
                <label>Password</label>
                <input type="text" value={password} name="password"
                    className="form-control" placeholder="Enter password"
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }} />
            </div>
            <button type="submit" onClick={loginHandler} className="btn btn-primary btn-block">Submit</button>
        </form>
        </>
    )
}

export default Login;
