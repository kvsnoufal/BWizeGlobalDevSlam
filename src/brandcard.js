import React, { useState, useEffect } from 'react';
import './brandcard.css';
import ReactDOM from 'react-dom';

export default function  BrandCard({inputdata}){

    return (
        // <div className="brandCard">{inputdata.brand} and {inputdata.pct}</div>
        <div className="brandCard">
            <div><img src={`${inputdata.brand}.png`} className='cardimg'></img></div>
            <div className="cardText">{inputdata.pct}% shop here</div>
            <div className="cardClick">Show more</div>
        </div>
    )
}