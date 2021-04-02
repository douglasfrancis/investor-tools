import './App.css';
import './components/Navbar.css';
import Amplify, { Auth } from "aws-amplify";
import awsconfig from "./aws-exports";
import { Route, BrowserRouter as Router, Switch, Link, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import LogIn from './components/LogIn';
import Register from './components/Register';
import logo from './logo.png';
import Dashboard from './components/Dashboard';


Amplify.configure(awsconfig);

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const history = useHistory();
  

  useEffect(() => {
    UserLoggedInState();
  }, []);

  const UserLoggedInState = () => {
    Auth.currentAuthenticatedUser().then(() => {
      setLoggedIn(true)
    }).catch(() => {
      setLoggedIn(false)
    })
  };

  const signOut = async() => {
    try {
     await Auth.signOut();
     setLoggedIn(false);

    } catch(error) {
     console.log("Error signing out", error)
    }
 };

 const onSignIn = () => {
  setLoggedIn(true);
 };

  return (

    <Router>
        <div className="App">
          <header className="App-header">
          <div className="navbar">
          <Link to="/"><img id='logo' src={logo} /></Link> 
              <Link to="/"><h2 id="app-name">Saathi- Investor Tool</h2></Link> 
             
              {loggedIn ? <button onClick={signOut}>Sign Out</button> : (<div><Link to="/login"> <button>Sign In</button> </Link> <Link to="/register"> <button>Register</button> </Link></div>)}
          </div>
          </header>
          <Switch>
            <Route exact path="/">
              <Dashboard loggedIn = {loggedIn}/>
            </Route>
            <Route path="/login">
              <LogIn onSignIn={onSignIn}/>
            </Route>
            <Route path="/register">
              <Register onSignIn={onSignIn}/>
            </Route>
          </Switch>
        </div>
    </Router>
  );
}

export default App;