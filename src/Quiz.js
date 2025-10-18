import clsx from 'clsx';
import React from "react";
import SubmitButton from "./SubmitButton"
import Intro from "./Intro"
import DOMPurify from 'dompurify';


export default function Quiz() {
  
  //state
  const [questionData, setQuestionData] = React.useState([])
  const [selectedAnswer,setSelectedAnswer] = React.useState({})
  const [isSubmitted,setIsSubmitted] =React.useState(false)
  const [isGameStarted,setIsGameStarted] = React.useState(false)


//data

function fetchQuestions () {
   fetch("https://opentdb.com/api.php?amount=5")
      .then((res) => res.json())
      .then((data) => {
        const shuffledData = data.results.map((q)=>{
        const allAnswers = [...q.incorrect_answers,q.correct_answer]
        const shuffledAnswers = allAnswers.sort(() => Math.random() - 0.5)
        return {...q,shuffledAnswers}
      }) 
       setQuestionData(shuffledData)
            })
}


  React.useEffect(() => {
   fetchQuestions()
                    }, [])
  
  
//functions
  function updateSelectedAnswer(index,answer){
                    setSelectedAnswer((prev)=>({...prev, [index]: answer}))
               }
                    
  function submitAnswers() {
    setIsSubmitted(true)
   }
 
   function startGame() {
    setIsGameStarted(true)
   }
   
function playAgain() { 
  setIsSubmitted(false) 
  setIsGameStarted(true) 
  fetchQuestions()
  setSelectedAnswer({})
}


//variables
const allAnswered = Object.keys(selectedAnswer).length === questionData.length
let score = 0
if(isSubmitted){
  for(let i = 0; i<questionData.length; i++) {
  if (selectedAnswer[i] === questionData[i].correct_answer) {
    score++
  }
}}



  return (
    <>
    {!isGameStarted && 
    <Intro 
           startGame={startGame}
           questionData={questionData} />}

    {isGameStarted && questionData.length > 0 && 
    (<section> 
      {questionData.map((data, questionIndex) => {
        return ( 
          <div key={questionIndex}>
            <fieldset className="question-box">
            <legend dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.question) }} />
              <div className="options">
                {data.shuffledAnswers.map((answer, answerIndex) => {
                 const isSelected = selectedAnswer[questionIndex]===answer
                 const correctAnswer = data.correct_answer===answer
                 const classLabel = clsx("quiz-option", {
  "correct-answer": isSubmitted && correctAnswer,
  "incorrect-answer": isSubmitted && isSelected && !correctAnswer,
  "selected-answer": !isSubmitted && isSelected,
  "remaining-answer": isSubmitted && !correctAnswer
});

                                                  
                  return (
                <label 
                  key={answerIndex}
                  className= {classLabel}
                  >
                    <input 
                      type="radio"
                     onChange={isSubmitted ? undefined : () => updateSelectedAnswer(questionIndex, answer)}
                      className="answer-input"                    
                      name={`question-${questionIndex}`}
                      value={answer}
                      disabled={isSubmitted}
                    />
                    {answer}
                  </label>    
                 )})}
              </div>
            </fieldset>
            <hr className="divider" />
          </div>
        )
      })}
       <SubmitButton submitAnswers={submitAnswers}
                     isSubmitted={isSubmitted}
                     allAnswered= {allAnswered}
                     playAgain={playAgain}
                     score={score}
                     questionData={questionData}
                   />
    </section> )}
    </>
  )}
