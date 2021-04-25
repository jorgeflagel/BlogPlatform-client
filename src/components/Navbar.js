import React, { useState, useRef, useEffect } from 'react'
import { NavLink, Link, useHistory } from "react-router-dom";

import Offcanvas from './Offcanvas';



export default function Navbar(props) {

    let history = useHistory();
    
    const [isMenuShowing , toggleMenu ] = useState(false);

    const node = useRef();
    const navIcon = useRef();
  
    const handleClick = e => {
      if (node.current.contains(e.target) || navIcon.current.contains(e.target)) {
        // inside click
        return;
      }  // outside click 
        toggleMenu(false);
    };

    useEffect(() => {
      document.addEventListener("mousedown", handleClick);
      return () => {
        document.removeEventListener("mousedown", handleClick);
      };
    });

    const logout = () => {
      window.localStorage.removeItem('blog-webpage-jwt');
      setTimeout(() => {
        props.setIsLogged(false);
        props.setUserInfo({});
        history.push('./');
      }, 300)
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand p-3" to="/">A Blog Platform <br/>about Technology</Link>
            <button ref={navIcon} className="navbar-toggler ms-auto" type="button" onClick={() => toggleMenu(!isMenuShowing)} aria-label="Toggle navigation"
              >
              <span className="navbar-toggler-icon"></span>
            </button>
            
            {props.isLogged ? 
                    <Offcanvas logout={logout} userInfo={props.userInfo}/>
                : <div className="ms-auto order-lg-last">
                    <button type="button" className="btn btn-outline-primary mx-2" onClick={() => history.push('/login')}>Login</button>
                    <button type="button" className="btn btn-outline-info" onClick={() => history.push('/signup')}>Signup</button>
                  </div>
            }
            <div ref={node} className={`collapse navbar-collapse ${isMenuShowing ? 'show' : ''}`} id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                    <NavLink exact className="nav-link" to="/" onClick={() => toggleMenu(!isMenuShowing)}>Home</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/articles" onClick={() => toggleMenu(!isMenuShowing)}>Articles</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/users" onClick={() => toggleMenu(!isMenuShowing)}>Users</NavLink>
                  </li>
                </ul>
            </div>
          </div>
        </nav>
    )
}
