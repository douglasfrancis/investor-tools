import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { Link } from 'react-router-dom';
import add from '../add.png';
import NewsFeed from './NewsFeed';
import FinancialData from './FinancialData';


export default function Dashboard( {loggedIn}) {

    const [EditorOpen, setEditorOpen] = useState(false);
    const [Editor2Open, setEditor2Open] = useState(false);
    const [Editor3Open, setEditor3Open] = useState(false);
    const [firstWidget, setFirstWidget] = useState("News");
    const [secondWidget, setSecondWidget] = useState("Finance");
    const [thirdWidget, setThirdWidget] = useState("");


    function clearWidget (e) {
        e.stopPropagation();
        setThirdWidget("")
        setEditor3Open(false);
    };
      
    return (
        <div className="dashboard">
            {EditorOpen && (<div class="widget-editor">
                <h2>Add Widget</h2>
                <button onClick={() => { setFirstWidget("News");setEditorOpen(false);}}>News Feed</button>
                <button onClick={() => {setFirstWidget("Finance")
        setEditorOpen(false);}}>Company Financial Data</button>
                <button id="cancel-btn" onClick={()=>setEditorOpen(false)}>Cancel</button>
                </div>)}

            {Editor2Open && (<div class="widget-editor">
                <h2>Add Widget</h2>
                <button onClick={() => { setSecondWidget("News");setEditor2Open(false);}}>News Feed</button>
                <button onClick={() => {setSecondWidget("Finance")
        setEditor2Open(false);}}>Company Financial Data</button>
                <button id="cancel-btn" onClick={()=>setEditor2Open(false)}>Cancel</button>
                </div>)}
            {Editor3Open && (<div class="widget-editor">
                <h2>Add Widget</h2>
                <button onClick={() => { setThirdWidget("News");setEditor3Open(false);}}>News Feed</button>
                <button onClick={() => {setThirdWidget("Finance")
        setEditor3Open(false);}}>Company Financial Data</button>
                <button id="cancel-btn" onClick={()=>setEditor3Open(false)}>Cancel</button>
                </div>)}
            
            {loggedIn ? (
            <>

            <div className="dashboard-container" id="news-container">
                <div>
                    {firstWidget === "" && <div onClick={()=> setEditorOpen(true)} className="img-container"><img id='add-widget' src={add}/></div>}
                    {firstWidget === "News" && <NewsFeed />}
                    {firstWidget === "Finance" && <FinancialData />}
                </div>
                {firstWidget !== "" && <p onClick={()=>{setFirstWidget("")}} className="close-widget">-</p>}
                
            </div>

            <div className="dashboard-container" id="financial-container" >
                <div>
                    {secondWidget === "" && <div onClick={()=> setEditor2Open(true)} className="img-container"><img id='add-widget' src={add}/></div>}
                    {secondWidget === "News" && <NewsFeed />}
                    {secondWidget === "Finance" && <FinancialData /> }
                </div>
                
                {secondWidget !== "" && <p onClick={()=>{setSecondWidget("")}} className="close-widget">-</p>}
            </div>

            <div  className="dashboard-container" id="api-3">
                <div>
                {thirdWidget === "" && <div onClick={()=> setEditor3Open(true)} className="img-container"><img id='add-widget' src={add}/></div>}
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
