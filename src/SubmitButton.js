import React from 'react'


export default function SubmitButton (props) {
      
  return (
     props.isSubmitted && props.allAnswered ?  
     <div className="score-box">
     <span>{`You scored ${props.score}/${props.questionData.length} correct answers`}</span>
           <button 
      className="play-again-button"
      onClick={props.playAgain} 
           >Play Again</button> 
     </div>
   :
           <button 
      className={props.allAnswered ?  
"submit-button" :
"disabled-submit-button"
}
      onClick={props.submitAnswers} 
           >Check answers</button>
         )}
    
