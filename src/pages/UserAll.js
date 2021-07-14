import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import IsLoading from '../components/IsLoading';
import Breadcrumb from '../components/Breadcrumb';

import { getUserAll } from '../helpers/Users';

export default function UserAll() {
    
    let [error, setError] = useState(null);
    let [isLoading, setIsLoading] = useState(false);
    let [users, setUsers] = useState([]);

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            setError(null);
            let [error, data] = await getUserAll();
            setUsers(data);
            setError(error);
            setIsLoading(false);
        })()
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
            {error && <div className="alert alert-danger m-4" role="alert">{error.message}</div>}
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
