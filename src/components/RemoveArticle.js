import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Markdown from 'markdown-to-jsx';

import IsLoading from './IsLoading'
import Breadcrumb from './Breadcrumb';

export default function RemoveArticle() { 

    let { id } = useParams();
    let history = useHistory();
    let [error, setError] = useState(null);
    let [isLoading, setIsLoading] = useState(false);

    let [article, setArticle] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        setError(null);
        fetch(process.env.REACT_APP_SERVER_URL + `articles/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
        }})
        .then(resp => resp.json())
        .then(data => {
            if(data.message){
                setIsLoading(false);
                setError(data.message)
            }
            else{
                setIsLoading(false);
                setArticle(data);
            }
        })
        .catch(err => {
            setIsLoading(false);
            setError(err.message);
        })
    }, [])

    const handleRemove = async (e) => {
        setError(null);
        fetch(process.env.REACT_APP_SERVER_URL + `articles/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${window.localStorage.getItem('blog-webpage-jwt')}`
            }})
        .then(resp => resp.json())
        .then(data => {
            if(data.message) {
                setError(data.message)
            }
            else {
                history.push('/');
            }
        })
        .catch(err => setError(err.message))
    }

    return( 
        <div className='container-fluid'>
            {error && <div className="alert alert-danger m-4" role="alert">{error}</div>}
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
