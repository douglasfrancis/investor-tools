import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { Link } from 'react-router-dom';
import add from '../add.png';
import NewsFeed from './NewsFeed';
import FinancialData from './FinancialData';


export default function Dashboard( {loggedIn}) {

    const [widgetEditorOpen, setWidgetEditorOpen] = useState(false);
    const [thirdWidget, setThirdWidget] = useState("")

    function addNews () {
        setThirdWidget("News");
        setWidgetEditorOpen(false);
    };

    function addFinance () {
        setThirdWidget("Finance")
        setWidgetEditorOpen(false);
    };
      
    return (
        <div className="dashboard">
            {widgetEditorOpen && (<div id="widget-editor">
                <h2>Add Widget</h2>

                <button onClick={addNews}>News Feed</button>
                <button onClick={addFinance}>Company Financial Data</button>
                </div>)}
            
            {loggedIn ? (
            <>

            <div className="dashboard-container" id="news-container">
                <NewsFeed />
            </div>

            <div className="dashboard-container" id="financial-container" >
                <FinancialData />
            </div>

            <div onClick={()=> setWidgetEditorOpen(true)} className="dashboard-container" id="api-3">
            {thirdWidget === "" && <img id='add-widget' src={add}/>}
            {thirdWidget === "News" && <NewsFeed />}
            {thirdWidget === "Finance" && <FinancialData />}
            
            </div> 
            </>) : (
            
                <p id="not-signed-in">Please Log In {<Link to="/login">Here</Link>}</p>

            )}
            
            

            
        </div>
    )
}
