import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

import IsLoading from './IsLoading';
import Breadcrumb from './Breadcrumb';

export default function Articles({ userInfo, query, showBreadcrumb }) {

    let [articles, setArticles] = useState([]);
    let [error, setError] = useState(null);
    let [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        let queryString = '';
        for (const  [key, value] of Object.entries(query)) {
            queryString += `&${key}=${value}`;
        }
        fetch(process.env.REACT_APP_SERVER_URL + `articles?${queryString}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
        }})
        .then(resp => resp.json())
        .then(data => {
            setArticles((articles) => [...articles, ...data]);
            setIsLoading(false);
        })
        .catch(err => {
            setIsLoading(false);
            setError(err.message);
        });
    }, [query])

    const articleList = articles.map((article) =>
            <li className="list-group-item" key={article._id}>
                <div className="row align-items-center">
                    <div className='col-12 col-md-9'>
                        <p><Link to={`/users/${article.author.username}`}>@{article.author.username}</Link></p>
                        <p>{article.author.position}</p>
                        <h3>{article.title}</h3>
                        <p>{article.updatedAt}</p>
                        <p>{article.resume}</p>
                    </div>
                    <div className='col-12 col-md-3 d-flex flex-column'>
                        <Link to={`/articles/${article._id}`} className="btn btn-primary">Read Article</Link>   
                        {article.author._id === userInfo._id 
                            ?   <>
                                    <Link to={`/myuser/articles/${article._id}`} className="btn btn-info mt-2">Edit Article</Link>
                                    <Link to={`/removearticle/${article._id}`} className="btn btn-danger mt-2">Remove Article</Link>
                                </>
                            :   null}
                    </div>
                </div>   
            </li>
    );

    return (
        <div className='container-fluid'>
            {showBreadcrumb 
                ? <Breadcrumb items={["Articles"]} />
                : null
            }
            {error && <div className="alert alert-danger m-4" role="alert">{error}</div>}
            {articles.length
                ?   <div className='container'>
                        <h1>Articles</h1>
                        <ul class="list-group list-group-flush text-start">
                            {articleList}
                        </ul>
                    </div>
                : <></>
            }
            {isLoading && <IsLoading />}
        </div>
    )
}
