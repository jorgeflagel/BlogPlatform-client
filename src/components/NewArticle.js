import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function NewArticle() {

    let [ title, setTitle ] = useState("");
    let [ text, setText ] = useState("");
    let [ resume, setResume ] = useState("");


    let history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(process.env.REACT_APP_SERVER_URL + "articles/newarticle", {
            method: 'POST',
            body: JSON.stringify({title, text, resume}),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bear ${window.localStorage.getItem('blog-webpage-jwt')}`
        }})
        .then(resp => resp.json())
        .then(data => {
            console.log(data);
            history.push('/');
        })
    }

    return (
        <form className="container px-5" onSubmit={handleSubmit}>
            <h1>New Article</h1>
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
            <button type="submit" className="btn btn-primary btn-lg">Add Article</button>
        </form>
    )
}
