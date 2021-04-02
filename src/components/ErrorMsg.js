import React from 'react';
import './ErrorMsg.css';

export default function ErrorMsg( {error, clearError} ) {
    return (
        <div className='error-msg'>
            <p>{error}</p>
            <p id="cancel" onClick={clearError}>X</p>
        </div>
    )
}
