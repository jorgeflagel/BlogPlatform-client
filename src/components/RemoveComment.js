import React from 'react';



export default function RemoveComment({commentId, setComments}) {

    const handleSubmit = (e) => {
        fetch(process.env.REACT_APP_SERVER_URL + `comments/${commentId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${window.localStorage.getItem('blog-webpage-jwt')}`
            }
        })
        .then(resp => resp.json())
        .then(data => {
            if(data.message) {
               alert(`Your comment can't be deleted: ${data.message}`);
            }
            else {
                setComments(comments => [...comments.filter(comment => comment._id !== data._id)]);
            }
        })
        .catch(err => console.error(err.message))
    }

    return (
        <button onClick={handleSubmit} className="btn btn-danger mt-2">
            Remove
        </button>
    )
}
