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

import Home from './pages/Home';
import ArticleAll from './pages/ArticleAll';
import Article from './pages/Article'; 
import ArticleNew from './pages/ArticleNew';
import ArticleEdit from './pages/ArticleEdit';
import ArticleRemove from './pages/ArticleRemove';
import UserAll from './pages/UserAll';
import User from './pages/User';
import UserEdit from './pages/UserEdit';
import Signup from './pages/Signup';
import Login from './pages/Login';



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
            <ArticleNew />
          </Route>
          <Route exact path="/removearticle/:id">
            <ArticleRemove />
          </Route>
          <Route exact path="/myuser/articles/:id">
            <ArticleEdit />
          </Route>
          <Route exact path="/articles">
            <ArticleAll userInfo={userInfo} query={{}} showBreadcrumb={true}/>
          </Route>
          <Route exact path="/articles/:id">
            <Article userInfo={userInfo} />
          </Route>
          <Route exact path="/users">
            <UserAll />
          </Route>
          <Route path="/users/:username">
            <User setIsLogged={setIsLogged} userInfo={userInfo}/>
          </Route>
          <Route exact path="/editmyprofile">
            <UserEdit userInfo={userInfo} setUserInfo={setUserInfo}/>
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
