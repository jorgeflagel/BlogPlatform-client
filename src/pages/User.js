import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import IsLoading from '../components/IsLoading'
import Breadcrumb from '../components/Breadcrumb';
//import Articles from '../components/Articles';
import ArticleList from '../components/ArticleList';

import { getArticleAll } from '../helpers/Articles';
import { getUserByName } from '../helpers/Users';

export default function User({userInfo, query}) {

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

    useEffect(() => {
        if(user){
            let query = { author: user._id };
            (async () => {
                setErrorArticles(null);
                setIsLoading(true);
                let [error, data] = await getArticleAll(query);
                setErrorArticles(error);
                setArticles(data);
                setIsLoading(false);
            })();
        }  
    }, [user])

    let [articles, setArticles] = useState([]);
    let [errorArticles, setErrorArticles] = useState(null);
    let [isLoading, setIsLoading] = useState(false);

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
                        <hr />
                        <h2>Articles</h2>
                        {isLoading 
                            ? <isLoading />
                            : articles.length !== 0 
                                ?   <ArticleList userInfo={userInfo} articles={articles}/>
                                : !errorArticles ? <p>The author hasn't upload any article</p> : <div className="alert alert-danger m-4" role="alert">{errorArticles.message}</div>
                        }
                        
                    </>
                :    <IsLoading />
        }
    </div>
    )
}
