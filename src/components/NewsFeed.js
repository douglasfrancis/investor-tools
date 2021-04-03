import React, { useEffect, useState } from 'react';
import Amplify, { API } from 'aws-amplify';
import Article from './Article';
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


export default function NewsFeed() {

    const [newsFeed, setNewsFeed] = useState([]);

    useEffect(() => {
        getNews();
    }, []);

    function getNews() { 
        const apiName = 'YahooAPI';
        const path = 'ne/news'; 
        const myInit = { 
    headers: {
        "x-rapidapi-key": "5bbd4c8cabmshfaf7fcfa069e60dp130430jsn2edf3067c7ff",
	"x-rapidapi-host": "yahoo-finance15.p.rapidapi.com",
	"useQueryString": "true"
    }, 
    response: false, 
};

        API.get(apiName, path, myInit).then(response => {
            console.log(response);
            setNewsFeed(response)
        }).catch(error => {
            console.log(error);
        });
    };
     

    return (
        <div>
             <h2>News Feed</h2>

             {newsFeed.length < 1 ? (<div class="loader"></div>) :(
                newsFeed.map((news, i) => {
                    return <Article key={i} title={news.title} link={news.link} date={news.pubDate}/>
                })
            )}
            
        </div>
    )
}
