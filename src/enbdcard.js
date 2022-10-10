import React, { useState, useEffect } from 'react';
import './enbdcard.css';
import ReactDOM from 'react-dom';

export default function  EnbdBrandCard(){

    return (
        // <div className="brandCard">{inputdata.brand} and {inputdata.pct}</div>
        <div className="enbdbrandCard">
            <div><img src="enbd.png" className='enbdcardimg'></img></div>
            <div className="enbdcardText"> 40% of top savers use ENBD Platinum to save upto 5% on grocery spends</div>
            <div className="enbdcardClick">Apply now for 5% cashback</div>
        </div>
    )
}