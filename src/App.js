import { React } from 'react';
import { createContext, useState } from 'react';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import About from './components/About';
import CreatePost from './components/CreatePost';
import { NavLink, Switch, Route, useHistory } from 'react-router-dom'

export const Context = createContext(null);

function App() {

  const history = useHistory();
  const [posts, setPosts] = useState([]);
  const [photoValue, setPhotoValue] = useState('');
  const [bodyValue, setBodyValue] = useState('');
  const [user, setUser] = useState('');
  const [userSignUp, setUserSignUp] = useState('');

  return (
    <Context.Provider value={{ 
      posts, setPosts, photoValue, setPhotoValue, 
      bodyValue, setBodyValue, 
      user, setUser, userSignUp, setUserSignUp, history 
    }}>
    <div className="comp">
      <button onClick={() => history.goBack()}>Back</button>
      <button onClick={() => history.goForward()}>Forward</button>
      {user}
      <nav id="menu">

          <span>
            <NavLink exact to="/">Home</NavLink>
          </span>
          <span>
            <NavLink to="/signup">Sign Up</NavLink>
          </span>
          <span>
            <NavLink to="/login">Log In</NavLink>
          </span>
          <span>
            <NavLink to="/newpost">New Post</NavLink>
          </span>
          <span>
            <NavLink to="/about">About</NavLink>
          </span>

      </nav>

      <Switch>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/newpost">
          <CreatePost />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>

    </div>
    </Context.Provider>
  );
}

export default App;
