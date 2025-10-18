import React from 'react'

export default function Intro (props) {
    return (!props.isGameStarted && 
    <div className="intro-box">
        <h1 className="intro-title"> Quizzical </h1>
         <h2 className="intro-description"> Where the challenge begins </h2>
        <button onClick={props.startGame} className="start-button"> Start quiz </button>
    </div> 
    )}
    
