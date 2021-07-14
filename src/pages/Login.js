import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

import { loginUser } from '../helpers/Login';

export default function Login({ setIsLogged, setUserInfo }) {

    let history = useHistory();
    let [error, setError] = useState(null);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        let [error, data] = await loginUser(username, password);
        if (error) setError(error);
        else {
            window.localStorage.setItem('blog-webpage-jwt', data.token);
            setIsLogged(true);
            setUserInfo(data.user);
            history.push('/');
        }
    }

    return (
        <form className="container px-5" onSubmit={handleSubmit}>
            <h1>Login</h1>
            <div className="mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <input type="text" className="form-control" id="username" placeholder="Your name" 
                    name="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" placeholder="Your password..." 
                    name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <button type="submit" className="btn btn-primary btn-lg">Login</button>
            {error && <div className="alert alert-danger m-4" role="alert">{error.message}</div>}
        </form>
    )
}
