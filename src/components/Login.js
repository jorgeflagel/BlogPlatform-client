import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

export default function Login(props) {

    let history = useHistory();
    let [error, setError] = useState(null);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        setError(null);
        e.preventDefault();
        fetch(process.env.REACT_APP_SERVER_URL + "myuser/login", {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: {
                'Content-Type': 'application/json'
        }})
        .then(resp => resp.json())
        .then(data => {
            if(data.message) {
                setError(data.message);
            }
            else {
                window.localStorage.setItem('blog-webpage-jwt', data.token);
                props.setIsLogged(true);
                console.log(data.user);
                props.setUserInfo(data.user)
                history.push('/');
            }
        })
        .catch(err => setError(err.message))
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
            {error && <div className="alert alert-danger m-4" role="alert">{error}</div>}
        </form>
    )
}
