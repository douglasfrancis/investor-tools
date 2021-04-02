import React from 'react';
import './Dashboard.css';

export default function Article( { title, link, date }) {
    return (
        <a href={link} target="_blank" className="article">
            <p>{title}</p>
            <p className="article-date">{date}</p>
           
            
        </a>
    )
}
