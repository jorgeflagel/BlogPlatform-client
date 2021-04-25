import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";

export default function EditArticle() {

    let history = useHistory();
    let { id } = useParams();
    let [error, setError] = useState(null);

    let [ title, setTitle ] = useState("");
    let [ text, setText ] = useState("");
    let [ resume, setResume ] = useState("");

    useEffect(() => {
        fetch(process.env.REACT_APP_SERVER_URL + `articles/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
        }})
        .then(resp => resp.json())
        .then(data => {
            if(data.message) {
                setError(data.message)
            }
            else{
                setTitle(data.title);
                setText(data.text);
                setResume(data.resume);
            }
        })
        .catch(err => setError(err.message))
    }, [id])

    const handleSubmit = (e) => {
        setError(null);
        e.preventDefault();
        let token = window.localStorage.getItem('blog-webpage-jwt');
        fetch(process.env.REACT_APP_SERVER_URL + `articles/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ title, text, resume, _id: id }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
        }})
        .then(resp => resp.json())
        .then(data => {
            if(data.message) {
                console.log(data);
                setError(data.message)
            }
            else{
                history.push(`/articles/${data._id}`);
            }
        })
        .catch(err => setError(err.message));
    }

    return (
        <div>
            {error && <div className="alert alert-danger m-4" role="alert">{error}</div>}
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
            {error && <div className="alert alert-danger m-4" role="alert">{error}</div>}
        </div>
    )
}
