import React, { useState, useEffect} from 'react';

import IsLoading from '../components/IsLoading';
import Breadcrumb from '../components/Breadcrumb';
import ArticleList from '../components/ArticleList';
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
    }, [query])

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
                        <ArticleList articles={articles} userInfo={userInfo} withAuthorInfo={true}/>
                    </div>
            }
            {isLoading && <IsLoading />}
        </div>
    )
}
