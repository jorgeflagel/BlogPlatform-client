import React, { useState } from 'react';
import { postComment } from '../helpers/Comments';

export default function NewComment({articleId, setComments}) {

    let [ text, setText ] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        let [error, data] = await postComment(articleId, text);
        if (error) console.error(error.message  );
        else {
            setComments(comments => [data,...comments]);
            setText('');
        }
    }


    return (
        <form className="container px-5" onSubmit={(e) => handleSubmit(e, setComments)}>
            <h4>New Comment</h4>
            <div className="mb-3">
                <textarea className="form-control" id="text" name="text" value={text} 
                    onChange={(e) => setText(e.target.value)} rows="10">Write your comment...</textarea>
            </div>
            <button type="submit" className="btn btn-primary btn-lg">Add Comment</button>
        </form>
    )
}