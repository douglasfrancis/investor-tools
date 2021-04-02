import { Auth } from 'aws-amplify';
import React, { useState } from 'react'
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import './Auth.css';
import ErrorMsg from './ErrorMsg';

export default function LogIn({onSignIn}) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const history = useHistory();

    const signIn = async (e) => {
        e.preventDefault();

        try{
            await Auth.signIn(username, password);
            history.push('/');
            onSignIn();

        } catch (error){
            setErrorMsg(error.message)
            setError(true);
        }

    };

    function clearError() {
        setError(false)
    };

    return (
        <div>
            {error && <ErrorMsg error={errorMsg} clearError={clearError}/>}
            
            <form>
            <h2>Log In</h2>
                <label htmlFor="username">Email</label>
                <input type="text" id="username" value={username} onChange={(e) => {setUsername(e.target.value)}}/>

                <label htmlFor="password">Password</label>
                <input type="password" id="password" value={password} onChange={(e) => {setPassword(e.target.value)}}/>

                <button className="auth-btn" onClick={signIn}>Sign In</button>

                <p>Don't have an account? <Link to="/register">Register Here</Link></p>
            </form>
        </div>
    )
}
