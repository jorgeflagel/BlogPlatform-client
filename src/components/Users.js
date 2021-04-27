import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import IsLoading from './IsLoading';
import Breadcrumb from './Breadcrumb';

export default function Users() {
    
    let [error, setError] = useState(null);
    let [isLoading, setIsLoading] = useState(false);
    let [users, setUsers] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        fetch(process.env.REACT_APP_SERVER_URL + "users", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
        }})
        .then(resp => resp.json())
        .then(data => {
            if(data.message){
                setIsLoading(false);
                setError(data.message);
            }
            else{
                setIsLoading(false);
                setUsers((users) => [...users, ...data]);
            }
        })
        .catch(err => {
            setIsLoading(false);
            setError(err.message);
        })
    }, [])

    const userList = users.map((user) =>
        <li className="list-group-item" key={user._id}>
                <div className="row align-items-center">
                    <div className='col-12 col-md-9'>
                        <h3><Link to={`/users/${user.username}`}>@{user.username}</Link></h3>
                        <h4>{user.position}</h4>
                        <p>{user.resume}</p>
                    </div>
                    <div className='col-12 col-md-3'>
                        <Link to={`/users/${user.username}`} className="btn btn-primary">More...</Link>   
                    </div>
                </div>   
            </li>
    );

    return (
        <div className='container-fluid'>
            <Breadcrumb items={['Users']}/>
            {error && <div className="alert alert-danger m-4" role="alert">{error}</div>}
            {users.length !== 0 &&
                <div className='container'>
                    <h1>Users</h1>
                    <ul className="list-group list-group-flush text-start">
                        {userList}
                    </ul>
                </div>
            }
            {isLoading && <IsLoading />}
        </div>
    )
}
