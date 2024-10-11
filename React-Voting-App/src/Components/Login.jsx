import React from "react";

const Login = (props) => {
    return (
        <div className="container">
        <div className="login-container">
            <h1 className="welcome-message">Welcome to Decenteralized Complaint Registration System</h1>
            <button className="login-button" onClick = {props.handleUserLogin}>Login Metamask</button>
            <button className="login-button" onClick = {props.handleAdminLogin}>Login Metamask as admin</button>
        </div>
        </div>
    )
}

export default Login;