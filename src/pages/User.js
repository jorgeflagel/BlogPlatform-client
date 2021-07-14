import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import IsLoading from '../components/IsLoading'
import Breadcrumb from '../components/Breadcrumb';
import Articles from '../components/Articles';

import { getUserByName } from '../helpers/Users';

export default function User({userInfo}) {

    let { username } = useParams();
    let [error, setError] = useState(null);

    let [user, setUser] = useState(null);

    useEffect(() => {
        (async () => {
            let [error, data] = await getUserByName(username);
            setError(error);
            setUser(data);
        })()
    }, [username])

    return (
        <div className='container-fluid'>
        <Breadcrumb items={user && !error ? ["Users", username] : []}/>
        {error
            ?   <div className="alert alert-danger m-4" role="alert">{error.message}</div>
            :   user
                ?   <>    
                        <div className='border-bottom'>
                            <h1>@{user.username}</h1>
                            <h2>{user.position}</h2>
                            <p>{user.resume}</p>
                        </div>
                        <Articles userInfo={userInfo} query={{ author: user._id }}/>
                    </>
                :    <IsLoading />
        }
    </div>
    )
}
