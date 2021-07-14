import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { getCommentsFromArticle } from '../helpers/Comments';

import IsLoading from './IsLoading';
import RemoveComment from './RemoveComment';

export default function Comments({ articleId, userInfo, setComments, comments }) {
    let [error, setError] = useState(null);
    let [isLoading, setIsLoading] = useState(false);

    //Fetching comments
    useEffect(() => {
        (async () => {
            setIsLoading(true);

            let [error, data] = await getCommentsFromArticle(articleId);
            if (error) setError(error);
            else setComments((comments) => [...comments, ...data]);

            setIsLoading(false);
        })();
    }, [])

    const commentList = comments.map((comment) =>
            <li className="list-group-item" key={comment._id}>
                <div className="row align-items-center">
                    <div className='col-12 col-md-9'>
                        <p><Link to={`/users/${comment.author.username}`}>@{comment.author.username}</Link></p>
                        <p>{comment.author.position}</p>
                        <p>{comment.updatedAt}</p>
                        <p>{comment.text}</p>
                    </div>
                    <div className='col-12 col-md-3 d-flex flex-column'>
                        {comment.author._id === userInfo._id 
                            ?   <>
                                    <RemoveComment setComments={setComments} commentId={comment._id}/>
                                </>
                            :   null}
                    </div>
                </div>   
            </li>
    );

    return (
        <div className='container-fluid'>
            <div className='container'>
                <h3>Comments</h3>
                    {error && <div className="alert alert-danger m-4" role="alert">{error}</div>}
                    {comments.length
                        ?   
                                <ul className="list-group list-group-flush text-start">
                                    {commentList}
                                </ul>
                        : <></>
                    }
                    {isLoading && <IsLoading />}
            </div>

        </div>
    )
}

