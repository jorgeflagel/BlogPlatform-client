import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import IsLoading from '../components/IsLoading';
import Breadcrumb from '../components/Breadcrumb';

import { getUserAll } from '../helpers/Users';

export default function UserAll() {
    
    let [error, setError] = useState(null);
    let [isLoading, setIsLoading] = useState(false);
    let [users, setUsers] = useState([]);

    const history = useHistory();

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

    const handleClick = (e) => history.push(`/users/${e.currentTarget.dataset.username}`)

    const userList = users.map((user) =>
        <li className="list-group-item" key={user._id} onClick={handleClick}data-username={user.username} style={{cursor: "pointer"}}>
                <div className="row align-items-center">
                    <div className='col-12'>
                        <h3>@{user.username}</h3>
                        <h4>{user.position}</h4>
                        <p>{user.resume}</p>
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
