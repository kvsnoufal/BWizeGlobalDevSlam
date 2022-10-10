import React, { useState, useEffect } from 'react';
import './feedcard.css';
import ReactDOM from 'react-dom';

export default function  FeedCard({prop}){

    return (
        // <div className="brandCard">{inputdata.brand} and {inputdata.pct}</div>
        <div className="FeedCard">
           <div className="FCName"><img className="avimg" src={prop.img}/><div>{prop.name}</div></div>
           <div className='FCTitle'>{prop.title}</div>
           <div className="FCBody">{prop.body}</div>
           <div className="FCFooter"><i class="gg-heart"></i><i class="gg-comment"></i><i class="gg-mail-reply"></i></div>
        </div>
    )
}