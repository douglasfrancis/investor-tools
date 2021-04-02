import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { Link } from 'react-router-dom';
import add from '../add.png';
import NewsFeed from './NewsFeed';
import FinancialData from './FinancialData';


export default function Dashboard( {loggedIn}) {

    const [widgetEditorOpen, setWidgetEditorOpen] = useState(false);
    const [firstWidget, setFirstWidget] = useState("News");
    const [secondWidget, setSecondWidget] = useState("Finance");
    const [thirdWidget, setThirdWidget] = useState("");

    function addNews () {
        setThirdWidget("News");
        setWidgetEditorOpen(false);
    };

    function addFinance () {
        setThirdWidget("Finance")
        setWidgetEditorOpen(false);
    };

    function clearWidget (e) {
        e.stopPropagation();
        setThirdWidget("")
        setWidgetEditorOpen(false);
    };
      
    return (
        <div className="dashboard">
            {widgetEditorOpen && (<div id="widget-editor">
                <h2>Add Widget</h2>

                <button onClick={addNews}>News Feed</button>
                <button onClick={addFinance}>Company Financial Data</button>
                <button id="cancel-btn" onClick={()=>setWidgetEditorOpen(false)}>Cancel</button>
                </div>)}
            
            {loggedIn ? (
            <>

            <div className="dashboard-container" id="news-container">
                {firstWidget === "" && <img id='add-widget' src={add}/>}
                {firstWidget === "News" && <NewsFeed />}
                {firstWidget === "Finance" && <FinancialData />}
                
            </div>

            <div className="dashboard-container" id="financial-container" >
                <div>
                    {secondWidget === "" && <div onClick={()=> setWidgetEditorOpen(true)} className="img-container"><img id='add-widget' src={add}/></div>}
                    {secondWidget === "News" && <NewsFeed />}
                    {secondWidget === "Finance" && <FinancialData /> }
                </div>
                
                {secondWidget !== "" && <p onClick={()=>{setSecondWidget("")}} className="close-widget">-</p>}
            </div>

            <div  className="dashboard-container" id="api-3">
                <div>
                {thirdWidget === "" && <div onClick={()=> setWidgetEditorOpen(true)} className="img-container"><img id='add-widget' src={add}/></div>}
                {thirdWidget === "News" && <NewsFeed />}
                {thirdWidget === "Finance" && <FinancialData />}

                </div>
                {thirdWidget !== "" && <p onClick={clearWidget} className="close-widget">-</p>}
            
            </div> 
            
            </>) : (
            
                <p id="not-signed-in">Please Log In {<Link to="/login">Here</Link>}</p>

            )}
            
            

            
        </div>
    )
}
