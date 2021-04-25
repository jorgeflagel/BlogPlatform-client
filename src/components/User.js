import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import IsLoading from './IsLoading'
import Breadcrumb from './Breadcrumb';
import Articles from './Articles';

export default function User({userInfo}) {

    let { username } = useParams();
    let [error, setError] = useState(null);

    let [user, setUser] = useState(null);

    useEffect(() => {
        fetch(process.env.REACT_APP_SERVER_URL + `users/${username}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
        }})
        .then(resp => resp.json())
        .then(data => {
            if(data.message){
                setError(data.message);
            }
            else{
                setUser(data);
            }
        })
    }, [username])


    return (
        <div className='container-fluid'>
        {user 
            ?   <>
                    <Breadcrumb items={["Users", username]}/>
                    {error && <div className="alert alert-danger m-4" role="alert">{error}</div>}
                    <div className='border-bottom'>
                        <h1>@{user.username}</h1>
                        <h2>{user.position}</h2>
                        <p>{user.resume}</p>
                    </div>
                    <Articles userInfo={userInfo} query={{author: user._id }}/>
                </>
            :   <><Breadcrumb items={[]} /><IsLoading /></>
        }
    </div>
    )
}
