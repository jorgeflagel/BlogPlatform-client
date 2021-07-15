import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Markdown from 'markdown-to-jsx';

import IsLoading from '../components/IsLoading'
import Breadcrumb from '../components/Breadcrumb';
import { getArticleById, removeArticle } from '../helpers/Articles';

export default function ArticleRemove() { 

    let { id } = useParams();
    let history = useHistory();
    let [error, setError] = useState(null);
    let [isLoading, setIsLoading] = useState(false);

    let [article, setArticle] = useState(null);

    //Fetching article
    useEffect(() => {
        (async () => {
            setIsLoading(true);
            setError(false);
            let [error, data] = await getArticleById(id);
            setError(error);
            setArticle(data)
            setIsLoading(false);
        })();
    }, [id])

    //Deleting article
    const handleRemove = async (e) => {
        setError(null);

        let article = await removeArticle(id);
        let error = article[0] 
        if (error) setError(error);
        else history.push('/articles');
    }

    return( 
        <div className='container-fluid'>
            {error && <div className="alert alert-danger m-4" role="alert">{error.message}</div>}
            {article !== null && 
                <>
                    <Breadcrumb items={["Articles", article.title.slice(0, 30) + '...']}/>
                    <article className='container text-start offset-md-2 col-12 col-md-8'>
                        <div className='border-bottom'>
                            <h1 className='text-center'>{article.title}</h1>
                            <Link to={`/users/${article.author.username}`}>@{article.author.username}</Link>
                            <p>{article.author.position}</p>
                        </div>
                        <div className = "alert alert-warning my-3" role="alert">
                            You are trying to delete this article. This operation is not reversible.<br/>
                            Are you sure?
                        </div>
                        <div className='border-bottom pb-3'>
                            <button type="button" className="btn btn-outline-primary me-3" onClick={handleRemove}>Yes, remove article.</button>
                            <Link to={`/articles/${id}`} type="button" className="btn btn-outline-secondary">Cancel</Link>
                        </div>  
                        <Markdown className='mt-3'>{article.text.slice(0, 1000) + '...'}</Markdown>
                    </article>
                </>
            }  
            {isLoading && <><Breadcrumb items={[]} /><IsLoading /></>} 
        </div>
    ) 
}
