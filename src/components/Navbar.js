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

    const logout = async () => {
      window.localStorage.removeItem('blog-webpage-jwt');
      await props.setIsLogged(false);
      await props.setUserInfo({});
      history.push('./');
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand p-3" to="/">Your Blog <br/>Platform</Link>
            <button ref={navIcon} className="navbar-toggler ms-auto me-3" type="button" onClick={() => toggleMenu(!isMenuShowing)} aria-label="Toggle navigation"
              >
              <span className="navbar-toggler-icon"></span>
            </button>
            
            {props.isLogged ? 
                    <Offcanvas logout={logout} userInfo={props.userInfo}/>
                : <div className="order-lg-last d-flex flex-column flex-md-row">
                    <button type="button" className="btn btn-outline-primary m-1" onClick={() => history.push('/login')}>Login</button>
                    <button type="button" className="btn btn-outline-info m-1" onClick={() => history.push('/signup')}>Signup</button>
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
