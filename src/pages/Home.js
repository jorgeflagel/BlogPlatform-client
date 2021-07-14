import React from 'react'
import Breadcrumb from '../components/Breadcrumb';

export default function Home() {
    return (
        <div className='container-fluid'>
            <Breadcrumb items={["Home"]}/>
            <div className='container'>
                <h1>A Blog Platform about Technology.</h1>

                <h2>This is a place where you can write and share your articles.</h2>
                <hr></hr>

                <h3>Register and Login</h3>
                <div>
                    <p>You can read all the articles that others have upload. But, you need to register and login to upload your own articles.</p>
                    <p>To register is not necessary provide an email.</p>
                    <p>The articles can be written with Markdown language, for example, for style titles and lists.</p>
                </div>
                <hr></hr>
                <h3>About me</h3>
                <div>
                    <p>This site is a sample of what I can do.</p>
                    <p>I know that there are a lot to improve and whaterever advice about how to improve the site is very welcome.</p>
                    <p>The site was developed with MERN stack (MongoDB, ExpressJS, ReactJS, NodeJs)</p>
                    <p>You can reach me at my email: jorgeflagel@gmail.com</p>
                </div>
            </div>
        </div>
    )
}
