import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";

import { editArticle, getArticleById } from '../helpers/Articles';

export default function ArticleEdit() {

    let history = useHistory();
    let { id } = useParams();
    let [error, setError] = useState(null);

    let [ title, setTitle ] = useState("");
    let [ text, setText ] = useState("");
    let [ resume, setResume ] = useState("");

    // Fetching Article
    useEffect(() => {
        (async () => {
            let [error, data] = await getArticleById(id);
            if(error) setError(error);
            else {
                setTitle(data.title);
                setText(data.text);
                setResume(data.resume);
            }
        })();
    }, [id])

    //Editing Article
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        let [error, data] = await editArticle(id, title, text, resume);
        if(error) setError(error);
        else history.push(`/articles/${data._id}`);
    }

    return (
        <div>
            {error && <div className="alert alert-danger m-4" role="alert">{error.message}</div>}
            <form className="container px-5" onSubmit={handleSubmit}>
                <h1>Edit Article</h1>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" placeholder="Add a title for your article..." 
                        name="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="resume" className="form-label">Resume</label>
                    <textarea className="form-control" id="resume" name="resume" value={resume} 
                        onChange={(e) => setResume(e.target.value)} rows="4">Write a resume of the article...</textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="text" className="form-label">Article</label>
                    <textarea className="form-control" id="text" name="text" value={text} 
                        onChange={(e) => setText(e.target.value)} rows="10">Write your article...</textarea>
                </div>
                <button type="submit" className="btn btn-primary btn-lg">Save Article</button>
            </form>
            {error && <div className="alert alert-danger m-4" role="alert">{error.message}</div>}
        </div>
    )
}
