import React, { useState } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';

export default function Login(){
    const [uname,setUname] = useState("Avatar Name");

    return(
       <div className="loginContainer">
        <div className="leftContainer">
<div className="LoginLogo"><span className="LoginLogoText">B-Wize</span></div>
<img className="loginimg" src="loginpageladytable.png"></img>    
<div className="LeftDescription">
    <span className="qn"> Are you a Financial Planning guru?</span>
<span className="ans">Show us... get ranked, gain followers and get paid</span>
<span className="qn"> Do you think you need to manage your finances better?</span>
<span className="ans">Analyze your finances, Learn from the best, follow experts, find their secrets for free</span>


</div>
   
       
        </div>


        <div className="rightContainer">
            <div className="LoginCard">
            <div className="LoginCardGroup">
                <div className="Logincardtext">Learn & Earn Today</div>
                <input className="username" value={uname} onChange={(v)=>setUname(v.target.value)}></input>
                <input className="username" value={'password'}></input>
                <div className="LogincardButton"><Link to="/optin">Login</Link></div>
            </div>
        </div>
        </div>
       </div>

    
    )
}