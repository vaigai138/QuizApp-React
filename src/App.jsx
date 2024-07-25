import { useEffect, useState } from 'react'
import './App.css'

import questionsData from "./questions.json"

function App() {
  
  const [currentQuestion,setCurrentQuestion]=useState(0);

  const [score,setScore]=useState(0);

  const [showScore,setShowScore]=useState(false);

  const [timer,setTimer]=useState(10);


  const handleAnswerclick=(selectedOption)=>{
    if(selectedOption===questionsData[currentQuestion].correctOption){
      setScore(score+1);
    }

    if(currentQuestion<questionsData.length-1){
      setCurrentQuestion(currentQuestion+1);
      setTimer(10);
    }else{
      setShowScore(true);
    }
  }

  const handleRestart=()=>{
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setTimer(10);
  }

  useEffect(()=>{
    let Interval;
        if(timer>0 && !showScore){
          Interval=setInterval(()=>{
            setTimer(timer-1);
          },1000)
        }else{
          clearInterval(Interval);
          setShowScore(true);
        }
        return ()=>clearInterval(Interval);
  },[timer,showScore])

  return (
    <>
    <h1 className='title'>Have some Quiz...!</h1>
    <hr />
    <div className="quiz-app">
      
      {showScore?(
        <div className="score-section">
        <h2>Your Score : {score}/{questionsData.length}</h2>
        <button onClick={handleRestart}>Restart</button>
      </div>
      ):(
        <div className="question-section">
        <h2>Question {currentQuestion+1}</h2>
        <p>{questionsData[currentQuestion].question}</p>
        <div className="options">
          {questionsData[currentQuestion].options.map((option,index)=>(
            <button key={index} onClick={()=>handleAnswerclick(option)}>{option}</button>
          ))}
        </div>
        <div className="timer">Time Left : <span>{timer}s</span></div>
      </div>
      )}

      
    </div>
    </>
  )
}

export default App
