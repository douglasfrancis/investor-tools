import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { Link } from 'react-router-dom';
import add from '../add.png';
import NewsFeed from './NewsFeed';
import FinancialData from './FinancialData';


export default function Dashboard( {loggedIn}) {
      
    return (
        <div className="dashboard">
            
            {loggedIn ? (<>
            
            <div className="dashboard-container" id="news-container">
                <NewsFeed />
            </div>

            <div className="dashboard-container" id="financial-container" >
                <FinancialData />
            </div>

            <div className="dashboard-container" id="api-3">
            <img id='add-widget' src={add}/>
            
            </div> </>) 
            
            :
            (
                <p id="not-signed-in">Please Log In {<Link to="/login">Here</Link>}</p>

            )}
            
            

            
        </div>
    )
}
