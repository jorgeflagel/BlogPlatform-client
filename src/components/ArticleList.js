import React from 'react';
import { Link, useHistory } from 'react-router-dom';


export default function ArticleList({articles, userInfo, withAuthorInfo}) {

    const history = useHistory();

    const handleClick = (e) => history.push(`/articles/${e.currentTarget.dataset.articleid}`)

    return (
        <ul className="list-group list-group-flush text-start">
        {articles.map((article) => {
            return(
                <li className="list-group-item"  key={article._id} >
                    <div className="row align-items-center">
                        {withAuthorInfo 
                            ?   <>
                                    <div className="d-flex flex-column flex-sm-row align-items-center">
                                        <img src={article.author.profileImageUrl} alt="profileimage" className="rounded-circle me-3" width={100}/>
                                        <div>
                                            <p><Link to={`/users/${article.author.username}`}>@{article.author.username}</Link></p>
                                            <p>{article.author.position}</p>
                                        </div>
                                    </div>                                    
                                </>
                            : null
                        }
                        <div className='col-12 col-md-9' onClick={handleClick} data-articleid={article._id} style={{cursor: "pointer"}}>
                            <h3>{article.title}</h3>
                            <p>{article.updatedAt}</p>
                            <p>{article.resume}</p>
                        </div>
                        <div className='col-12 col-md-3 d-flex flex-column'>
                            {article.author._id === userInfo._id 
                                ?   <>
                                        <Link to={`/myuser/articles/${article._id}`} className="btn btn-info mt-2">Edit Article</Link>
                                        <Link to={`/removearticle/${article._id}`} className="btn btn-danger mt-2">Remove Article</Link>
                                    </>
                                :   null}
                        </div>
                    </div>   
                </li>
            )
        })}
        </ul>    
    )
}