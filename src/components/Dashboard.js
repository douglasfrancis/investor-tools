import React, { useEffect, useState } from 'react';
import Amplify, { API } from 'aws-amplify';
import './Dashboard.css';
import { Link } from 'react-router-dom';
import add from '../add.png';
import NewsFeed from './NewsFeed';

Amplify.configure({

    API: {
        endpoints: [
            {
                name: "YahooAPI",
                endpoint: "https://yahoo-finance15.p.rapidapi.com/api/yahoo/"
            }
        ]
    }
});

export default function Dashboard( {loggedIn}) {

    
    const [financialData, setFinancialData] = useState(null);
    const [companyCode, setCompanyCode] = useState("TSLA")


    useEffect(()=>{
        //getFinancials();
    }, []);

   
    function getFinancials() { 
        
        const apiName = 'YahooAPI';
        const path = `qu/quote/${companyCode}/financial-data`; 
        const myInit = { 
    headers: {
        "x-rapidapi-key": "945191d9a0mshfec942945d59dc1p149c10jsn210938bab534",
	"x-rapidapi-host": "yahoo-finance15.p.rapidapi.com",
        "useQueryString": "true"
    }, 
    response: false, 
};

         API.get(apiName, path, myInit).then(response => {
            setFinancialData(response.financialData);
            console.log(response)
        }).catch(error => {
            console.log(error.response);
        });
    };
      
    return (
        <div className="dashboard">
            
            {loggedIn ? (<><div className="dashboard-container" id="news-container">
                                <NewsFeed />
                         </div>) :

            <div className="dashboard-container" id="financial-container" >
            <h2>Company Financial Data</h2>
            <form id="input-form">
                <input onKeyPress={(e)=>{e.target.keyCode === 13 && e.preventDefault(); getFinancials()}} type="text" value={companyCode} onChange={(e)=>{
                    setCompanyCode(e.target.value)}}/>
            </form>
           
                <div>
                    {financialData ? (<>
                    <p>Recommendation: {financialData.recommendationKey}</p>
                    <p>Based on {financialData.numberOfAnalystOpinions.fmt} analyst opinions</p>
                    <table >
                        <tbody>
                            <tr>
                            <th scope="row">Current Price</th>
                            <td>${financialData.currentPrice.fmt}</td>
                            </tr>
                            <tr>
                            <th scope="row">High Price</th>
                            <td>${financialData.targetHighPrice.fmt}</td>
                            </tr>
                            <tr>
                            <th scope="row">Low Price</th>
                            <td>${financialData.targetLowPrice.fmt}</td>
                            </tr>
                            <tr>
                            <th scope="row">Mean Price</th>
                            <td>${financialData.targetMeanPrice.fmt}</td>
                            </tr>
                            <tr>
                            <th scope="row">Revenue</th>
                            <td>${financialData.totalRevenue.fmt}</td>
                            </tr>
                            <tr>
                            <th scope="row">Gross Profits</th>
                            <td>${financialData.grossProfits.fmt}</td>
                            </tr>
                            <tr>
                            <th scope="row">Profit Margin</th>
                            <td>{financialData.profitMargins.fmt}</td>
                            </tr>
                            <tr>
                            <th scope="row">Total Cash</th>
                            <td>${financialData.totalCash.fmt}</td>
                            </tr>
                            <tr>
                            <th scope="row">Total Debt</th>
                            <td>${financialData.totalDebt.fmt}</td>
                            </tr>
                        </tbody>
                    </table>
                    </>
                    ) : (
                        <p>No Data for that Company code</p>
                    )}

                    
                </div>
            </div>

            <div className="dashboard-container" id="api-3">
            <img id='add-widget' src={add}/>
            
            </div> </>) :
            (
                <p id="not-signed-in">Please Log In {<Link to="/login">Here</Link>}</p>

            )}
            
            

            
        </div>
    )
}
