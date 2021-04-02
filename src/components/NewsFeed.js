import React, { useEffect, useState } from 'react';
import Amplify, { API } from 'aws-amplify';
import Article from './Article';
import './Dashboard.css';

Amplify.configure({
    
    API: {
        endpoints: [
            {
                name: "NewsFeedAPI",
                endpoint: "https://yahoo-finance15.p.rapidapi.com/api/yahoo"
            }
        ]
    }
});

export default function NewsFeed() {

    const [newsFeed, setNewsFeed] = useState([]);

    useEffect(() => {
        getNews();
    }, []);

    /*function getNews() { 
        const apiName = 'NewsFeedAPI';
        const path = 'ne/news'; 
        const myInit = { 
    headers: {
        "x-rapidapi-key": "945191d9a0mshfec942945d59dc1p149c10jsn210938bab534",
	"x-rapidapi-host": "yahoo-finance15.p.rapidapi.com",
	"useQueryString": "true"
    }, 
    response: true, 
};

        API.get(apiName, path, myInit).then(response => {
            console.log(response);
            setNewsFeed(response)
        }).catch(error => {
            console.log(error);
        });
    };*/

    function getNews() { 
        const apiName = 'NewsFeedAPI';
        const path = '/ne/news';
        const myInit = { // OPTIONAL
          headers: {
            "x-rapidapi-key": "945191d9a0mshfec942945d59dc1p149c10jsn210938bab534",
            "x-rapidapi-host": "yahoo-finance15.p.rapidapi.com",
            "useQueryString": "true"
          }, // OPTIONAL
        };
      
        return API.get(apiName, path, myInit);
      }
      
      (async function () {
        const response = await getNews();
        console.log(response)
      })();

     

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
