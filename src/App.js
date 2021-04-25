import './App.css';
import React, { useState, useEffect } from "react";

// importing react-router
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

// impoting components
import Navbar from './components/Navbar';
import Home from './components/Home';
import Users from './components/Users';
import Articles from './components/Articles';
import Signup from './components/Signup';
import Login from './components/Login';
import User from './components/User';
import Article from './components/Article'; 
import NewArticle from './components/NewArticle';
import EditUser from './components/EditUser';
import EditArticle from './components/EditArticle';
import RemoveArticle from './components/RemoveArticle';


function App() {

  const [ isLogged, setIsLogged] = useState(false);
  const [ userInfo, setUserInfo ] = useState({});

  useEffect(() => {    
    let token = window.localStorage.getItem('blog-webpage-jwt')
    if (token) {
      setIsLogged(true);
      fetch(process.env.REACT_APP_SERVER_URL + `myuser`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
      }})
      .then(resp => resp.json())  
      .then(data => {
          console.log(data);
          setUserInfo(data);
      })
    }
    else {
      setIsLogged(false);
      setUserInfo({});
      console.log('There was no token');
    }
  },[])

  return (
    <Router>
      <div className="App">
        <Navbar isLogged={isLogged} setIsLogged={setIsLogged} userInfo={userInfo} setUserInfo={setUserInfo}/>
        <Switch>
          <Route exact path="/" >
            <Home />
          </Route>
          <Route exact path="/newarticle">
            <NewArticle />
          </Route>
          <Route exact path="/removearticle/:id">
            <RemoveArticle />
          </Route>
          <Route exact path="/editmyprofile">
            <EditUser userInfo={userInfo} setUserInfo={setUserInfo}/>
          </Route>
          <Route exact path="/myuser/articles/:id">
            <EditArticle />
          </Route>
          <Route exact path="/articles">
            <Articles userInfo={userInfo} query={{}} showBreadcrumb={true}/>
          </Route>
          <Route exact path="/articles/:id">
            <Article userInfo={userInfo} />
          </Route>
          <Route exact path="/users">
            <Users />
          </Route>
          <Route path="/users/:username">
            <User setIsLogged={setIsLogged} userInfo={userInfo}/>
          </Route>
          <Route path="/login">
            <Login setIsLogged={setIsLogged} setUserInfo={setUserInfo}/>
          </Route>
          <Route path="/signup">
            <Signup setIsLogged={setIsLogged} setUserInfo={setUserInfo}/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
