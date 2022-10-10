import React, { useState } from 'react';
import './Login.css';
import "./Optin.css";


import { Link } from 'react-router-dom';
export default function Optin(){
    
    const [part1, setPart1]  =useState(true)
    const [part2, setPart2]  =useState(false)
    return (
<div className="loginContainer">
        <div className="leftContainer">
        <div className="LoginLogo"><span className="LoginLogoText">B-Wize</span></div>
        <img className="loginimg" src="optin1.png"></img>    
        <div className="LeftDescription">
    <span className="qn"> Check your finances... savings, expenses and more</span>
<span className="ans">Publish your data anonymously and let others learn your financial planning tips. Get paid helping others</span>
{/* <span className="qn"> Do you think you need to manage your finances better?</span>
<span className="ans">Analyze your finances, Learn from the best, follow experts, find their secrets for free</span> */}


</div>
        </div>
        

        <div className="rightContainer">
        <div className="LoginCard">
        {part1 && <div className="OptinCardGroup">
            <input className='checkboxoptin' type='checkbox'></input>
            <div className='checkboxtext1'>Allow B-Wize to analyze your transactions</div>
            <div className="LogincardButton" onClick={()=>{setPart1(false);setPart2(true)}}>Continue</div>
        </div>}
        {part2 && <div className="OptinCardGroup2">
            <div className="radiongrp">
            <input className='radiooptin1' type='radio'></input>
            <div className='radio1text'>Publish analysis in public leaderboard (no names or personal identifiers will be used)</div></div>
            <div className="radiongrp">
            <input className='radiooptin1' type='radio'></input>
            <div className='radio2text'>I just want to spectate. I don't want to get paid</div></div>
            <div className="OptincardButton" onClick={()=>{setPart1(false);setPart2(true)}}><Link to="/">Continue</Link></div>
        </div>}
        </div>
        </div>
</div>
    )}