import React, { useEffect, useState } from 'react';
import Amplify, { API } from 'aws-amplify';
import './Dashboard.css';

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


export default function FinancialData() {

    const [financialData, setFinancialData] = useState(null);
    const [companyCode, setCompanyCode] = useState("TSLA")


    useEffect(()=>{
        
        getFinancials();

    }, []);

    async function getFinancials() { 
        
        
        const apiName = 'YahooAPI';
        const path = `qu/quote/${companyCode}/financial-data`; 
        const myInit = { 
    headers: {
        "x-rapidapi-key": "5bbd4c8cabmshfaf7fcfa069e60dp130430jsn2edf3067c7ff",
        "x-rapidapi-host": "yahoo-finance15.p.rapidapi.com",
        "useQueryString": "true"
    }, 
    response: false, 
};

         await API.get(apiName, path, myInit).then(response => {
            setFinancialData(response.financialData);
            console.log(response)
        }).catch(error => {
            console.log(error.response);
        });
    };

    return (
        <div>
            <h2>Company Financial Data</h2>
            <form onSubmit={e => e.preventDefault()} id="input-form">
                <input onKeyUp={(event) => {
                    if(event.key == 'Enter'){ getFinancials()} }} id="input-code" type="text" value={companyCode} onChange={(e)=>{
                    setCompanyCode(e.target.value)}}/>
            </form>
           
                <div>
                    {financialData ? (<>
                    <h2 id='recommend'>Recommendation: {financialData.recommendationKey}</h2>
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
    )
}
