import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { useHistory } from 'react-router';
import './Auth.css';
import { Link } from 'react-router-dom';
import ErrorMsg from './ErrorMsg';

export default function Register( {onSignIn} ) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [code, setCode] = useState("");
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    
    const history = useHistory();

    const newSignUp = async (e) => {
        e.preventDefault();

        try {
            const { user } = await Auth.signUp({
                username,
                password,
                attributes: {
                   // email,          // optional
                   // phone_number,   // optional - E.164 number convention
                    
                }
            });
            console.log(user);
            setConfirmOpen(true);
            
        } catch (error) {
            setErrorMsg(error.message)
            setError(true);
        }

    };

    async function confirmSignUp(e) {
        e.preventDefault();

        try {
          await Auth.confirmSignUp(username, code);
          onSignIn();
          history.push('/');
        } catch (error) {
            setErrorMsg(error.message)
            setError(true);
        }
    }

    async function resendConfirmationCode() {
        try {
            await Auth.resendSignUp(username);
            console.log('code resent successfully');
        } catch (err) {
            console.log('error resending code: ', err);
        }
    }

    function clearError() {
        setError(false)
    };

    return (
        <div>
            {error && <ErrorMsg error={errorMsg} clearError={clearError}/>}
            {confirmOpen && (
                <div className="confirm-register">

                <form>
                <h2>Confirm Registration</h2>
                <p>Please check your email and enter the confirmation code below</p>
                    <input value={username} disabled/>
                    <input placeholder="Enter Code" value={code} onChange={(e)=> {setCode(e.target.value)}} />

                    <button className="auth-btn" onClick={confirmSignUp}>Confirm</button>

                    <p>Haven't received a code? <a onClick={resendConfirmationCode}>Request a new one</a></p>
                </form>

                </div>
            )}

            <form>
            <h2>Register</h2>
                <label htmlFor="username">Email</label>
                <input type="text" id="username"  value={username} onChange={(e) => {setUsername(e.target.value)}}/>

                <label htmlFor="password">Password</label>
                <input type="password" id="password" value={password} onChange={(e) => {setPassword(e.target.value)}}/>

                <button className="auth-btn" onClick={newSignUp}>Register</button>

                <p>Already have an account? <Link to="/login">Log In</Link></p>
            </form>
        </div>
    )
}
