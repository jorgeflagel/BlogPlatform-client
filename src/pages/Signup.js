import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

import { signupUser } from '../helpers/Signup';


export default function Signup(props) {

    let history = useHistory();
    let [error, setError] = useState(null);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        let [error, data] = await signupUser(username, email, password, passwordConfirmation);
        if (error) setError(error);
        else {
            window.localStorage.setItem('blog-webpage-jwt', data.token);
            props.setUserInfo(data.user);
            props.setIsLogged(true);
            history.push('/');
        } 
    }

    return (
        <form className="container px-5" onSubmit={handleSubmit}>
            <h1>Signup</h1>
            <div className="mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <input type="text" className="form-control" id="username" placeholder="Your name"
                    name="username" value={username} onChange={(e) => setUsername(e.target.value)} required/>
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" placeholder="name@example.com"
                    name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" placeholder="Your password..."
                    name="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
            </div>
            <div className="mb-3">
                <label htmlFor="passwordConfirmation" className="form-label">Confirm password</label>
                <input type="password" className="form-control" id="passwordConfirmation" placeholder="Confirm password..."
                    name="passwordConfirmation" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} required/>
            </div>
            <button type="submit" className="btn btn-info btn-lg">Signup</button>
            {error && <div className="alert alert-danger m-4" role="alert">{error}</div>}
        </form>
    )
}
