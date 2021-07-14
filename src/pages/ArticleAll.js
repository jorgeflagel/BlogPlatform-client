import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

import IsLoading from '../components/IsLoading';
import Breadcrumb from '../components/Breadcrumb';
import { getArticleAll } from '../helpers/Articles';

export default function ArticleAll({ userInfo, query, showBreadcrumb }) {

    let [articles, setArticles] = useState([]);
    let [error, setError] = useState(null);
    let [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        (async () => {
            setError(null);
            setIsLoading(true);
            let [error, data] = await getArticleAll(query);
            setError(error);
            setArticles(data);
            setIsLoading(false);
        })();
    }, [])

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
            {error && <div className="alert alert-danger m-4" role="alert">{error.message}</div>}
            {articles.length === 0
                ?    <></>
                :   <div className='container'>
                        <h1>Articles</h1>
                        <ul className="list-group list-group-flush text-start">
                            {articleList}
                        </ul>
                    </div>
            }
            {isLoading && <IsLoading />}
        </div>
    )
}
