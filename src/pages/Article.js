import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Markdown from 'markdown-to-jsx';

import IsLoading from '../components/IsLoading'
import Breadcrumb from '../components/Breadcrumb';
import Comments from '../components/Comments';
import NewComment from '../components/NewComment';

import { getArticleById } from '../helpers/Articles';

export default function Article({ userInfo }) { 

    let { id } = useParams();
    let [article, setArticle] = useState(null);
    let [error, setError] = useState(null);
    let [comments, setComments] = useState([]);

    useEffect(() => {
        (async () => {
            setError(null);
            let [error, data] = await getArticleById(id);
            setError(error);
            setArticle(data);
        })();
    }, [id])

    return( 
        <div className='container-fluid'>
            {error 
            ? <div className="alert alert-danger m-4" role="alert">{error.message}</div>
            : article 
                ?   <>
                        <Breadcrumb items={["Articles", article.title.slice(0, 30)]}/>
                        <article className='container text-start offset-md-2 col-12 col-md-8'>
                            <div className='border-bottom'>
                                <h1 className='text-center'>{article.title}</h1>
                                <div className="d-flex flex-column flex-sm-row align-items-center">
                                        <img src={article.author.profileImageUrl} alt="profileimage" className="rounded-circle me-3" width={100}/>
                                        <div>
                                            <p><Link to={`/users/${article.author.username}`}>@{article.author.username}</Link></p>
                                            <p>{article.author.position}</p>
                                </div>    
                                </div>
                                {article.author._id === userInfo._id 
                                    ?   <div className='mb-3 d-flex align-items-center justify-content-center justify-content-sm-start'>
                                            <Link to={`/myuser/articles/${article._id}`} className="btn btn-info mt-2 me-3">Edit Article</Link>
                                            <Link to={`/removearticle/${article._id}`} className="btn btn-danger mt-2">Remove Article</Link>
                                        </div>
                                    :   null}
                            </div>
                            <Markdown className='pt-5'>{article.text}</Markdown>
                            <hr/>
                            <Comments articleId={article._id} userInfo={userInfo} setComments={setComments} comments={comments}/>
                            <NewComment articleId={article._id} setComments={setComments} />
                        </article>
                    </>
                :   <><Breadcrumb items={[]} /><IsLoading /></>
            }
        </div>
    ) 
}
