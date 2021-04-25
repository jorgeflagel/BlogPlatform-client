import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons'

export default function Offcanvas({logout, userInfo}) {

    let [isOffcanvasShowing, toggleOffcanvas] = useState(false);

    const node = useRef();
    const navButton = useRef();

    const handleClick = e => {
        if (node.current.contains(e.target) || navButton.current.contains(e.target)) {
          // inside click
          return;
        }  // outside click 
          toggleOffcanvas(false);
      };

      useEffect(() => {
        document.addEventListener("mousedown", handleClick);
        return () => {
          document.removeEventListener("mousedown", handleClick);
        };
      });

    return (
        <>
            <button ref={navButton} className="btn btn-primary ms-3 order-lg-last rounded-circle" type="button" onClick={() => toggleOffcanvas(!isOffcanvasShowing)}><FontAwesomeIcon icon={faUser} size='3x'/></button>
            <div ref={node} className={`offcanvas offcanvas-end ${isOffcanvasShowing ? 'show' : ''}`} style={{visibility: `${isOffcanvasShowing ? 'visible' : 'hiden'}`}} tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                <div className={`offcanvas-header flex-column border-bottom`}>
                    <h5 id="offcanvasRightLabel">@{userInfo.username}</h5>
                    <p>{userInfo.email}</p>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close" onClick={() => toggleOffcanvas(!isOffcanvasShowing)}></button>
                </div>
                <div className='offcanvas-body'>
                    <ul className='list-group list-group-flush text-start'>
                        <li className='list-group-item'>
                            <Link className='text-decoration-none' to='/newarticle' data-bs-dismiss="offcanvas" onClick={() => toggleOffcanvas(!isOffcanvasShowing)}>Create article</Link>
                        </li>
                        <li className='list-group-item'>
                            <Link className='text-decoration-none' to={`/users/${userInfo.username}`} onClick={() => toggleOffcanvas(!isOffcanvasShowing)}>View my profile & articles</Link>
                        </li>
                        <li className='list-group-item'>
                            <Link className='text-decoration-none disabled' to='/editmyprofile' onClick={() => toggleOffcanvas(!isOffcanvasShowing)}>Edit my profile</Link>
                        </li>
                        {/* <li className='list-group-item'>
                            <Link className='text-decoration-none' to='/favoritesauthors' onClick={() => toggleOffcanvas(!isOffcanvasShowing)}>My favorites authors</Link>
                        </li>
                        <li className='list-group-item disabled'>
                            <Link className='text-decoration-none' to='/articlessaved' onClick={() => toggleOffcanvas(!isOffcanvasShowing)}>Articles saved</Link>
                        </li> */}
                        <li className='list-group-item'>
                            <button type="button" className="btn btn-outline-danger mx-2 ms-auto" onClick={() => {logout();toggleOffcanvas(!isOffcanvasShowing);}}>Logout</button>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}
