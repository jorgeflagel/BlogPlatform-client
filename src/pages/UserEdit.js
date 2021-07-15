import React, { useState } from 'react';
import { useHistory } from "react-router-dom";



export default function UserEdit({ userInfo, setUserInfo }) {

    let history = useHistory();
    let [error, setError] = useState(null);

    const [username, setUsername] = useState(userInfo.username);
    const [email, setEmail] = useState(userInfo.email);
    const [position, setPosition] = useState(userInfo.position);
    const [resume, setResume] = useState(userInfo.resume);
    const [image, setImage] = useState()


    const handleSubmit = (e) => {
        setError(null);
        e.preventDefault();
        let token = window.localStorage.getItem('blog-webpage-jwt');
        fetch(process.env.REACT_APP_SERVER_URL + "myuser", {
            method: 'PUT',
            body: JSON.stringify({username, email, position, resume, image}),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
        }})
        .then(resp => resp.json())
        .then(data => {
            if(data.message){
                setError(data.message);
            }
            else{
                setUserInfo(data)
                history.push(`/users/${data.username}`);
            }
        })
        .catch(err => setError(err.message));
    }

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = ()  => setImage(reader.result);
    }

    return (
        <div>
            {error && <div className="alert alert-danger m-4" role="alert">{error}</div>}
            <form className="container px-5" onSubmit={handleSubmit}>
            <h1>Edit User Information</h1>
            <div className="mb-3">
                <label htmlFor="profile-image" className="form-label col-12">Your Profile Image</label>
                <input type="file" id="profile-image" name="image" onChange={handleFileInputChange}/>
            </div>
            {image && <img className="m-5" src={image} alt="profileImage" width="200" style={{borderRadius: "50%"}}/>}

            <div className="mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <input type="text" className="form-control" id="username" placeholder="Your username" 
                    name="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">E-mail</label>
                <input type="email" className="form-control" id="email" placeholder="Your email..." 
                    name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="mb-3">
                <label htmlFor="position" className="form-label">Your Position</label>
                <input type="text" className="form-control" id="position" placeholder="Your position..." 
                    name="position" value={position} onChange={(e) => setPosition(e.target.value)}/>
            </div>
            <div className="mb-3">
                <label htmlFor="resume" className="form-label">Your Resume</label>
                <textarea type="text" className="form-control" id="resume" 
                    name="resume" value={resume} onChange={(e) => setResume(e.target.value)}>Tell us about you</textarea>
            </div>
            <button type="submit" className="btn btn-primary btn-lg">Update information</button>
        </form>
        </div>
    )
}
