import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

function Nav() {

    return (

        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
            <div className="container">
                <Link className="navbar-brand" to={"/login"}>
                    Yeet.io
                </Link>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to={"/login"}>
                                Login
                        </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={"/register"}>
                                Register
                        </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Nav;
