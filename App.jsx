import React from "react"
import Score from "./components/Score"
import Die from "./components/Die"
import ToggleSwitch from "./components/ToggleSwitch"
import { nanoid } from "nanoid"

export default function App() {
  const [dice, setDice] = React.useState([])
  const [totalScore, setTotalScore] = React.useState(startingScore())
  const [sumOfRolls, setSumOfRolls] = React.useState(0)
  const [matchTheScore, setMatchTheScore] = React.useState([])
  const [beatGame, setBeatGame] = React.useState(false)
  const [lostGame, setLostGame] = React.useState(false)
  const [easyMode, setEasyMode] = React.useState(false)

  
  //fix Hover 
  //do something when you win & change to restart game

  

  React.useEffect(()=> {
    newRoll()
  },[])

  React.useEffect(()=>{
    const gameOver = totalScore.map(score => !score.isCompleted ? score.value : '').filter(num => num !== '')
    checkIfLost(gameOver,sumOfRolls)
  },[dice])

  React.useEffect(()=> {
    const checkIfWon = totalScore.every(score => score.isCompleted)
    if(checkIfWon){
        setBeatGame(true)
    }

  },[totalScore])

  function generateNewDice(){
    return {
        value: Math.ceil(Math.random() * 6),
        id: nanoid()
    }    
  }

  function newRoll(){
    let newDice = []
    for(let i = 1; i <= 2; i++){
        newDice.push((generateNewDice()))
    }
    setDice(newDice)
    
    const sum = newDice.reduce((acc,c) => acc + c.value, 0)
    setSumOfRolls(sum)
  }

  function startingScore(){
    let score = []
    for(let i = 1; i <= 12; i++){
        score.push({ value: i, id: nanoid(), isUsed: false, isCompleted: false })
    }
    return score
  }

function handleScoreClick(id, value, isUsed){
    const findData = totalScore.find(data => data.id == id).isUsed

    if(findData){
        setMatchTheScore(oldScore => oldScore.filter(num => num !== value)
        )
    }else{
        setMatchTheScore(prevValue => [...prevValue, value])
    }
    setTotalScore(prevScore => 
        prevScore.map(oldScore => oldScore.id === id ? {...oldScore, isUsed:!isUsed} : oldScore))
}

function submitMatchScore(){
    const score = matchTheScore.reduce((acc,c) => acc + c, 0)

    if(score === sumOfRolls){
        setTotalScore(prevScore => 
            prevScore.map(oldScore => 
                matchTheScore.includes(oldScore.value) 
                    ? {...oldScore, isCompleted: true} 
                    : oldScore
            )
        ); 
        setMatchTheScore([])
        newRoll()
    }else{
        alert(`sum does not add up to ${sumOfRolls}`)
    }
}

function restartGame(){
    setDice([])
    setTotalScore(startingScore())
    setSumOfRolls(0)
    setMatchTheScore([])
    newRoll()
    setLostGame(false)
    setBeatGame(false)
}

function checkIfLost(numbers, sum) {
    if(!easyMode){
        function iter(index, right, left) {
            if (!left) return result.push(right);
            if (left < 0 || index >= numbers.length) return;
            iter(index + 1, [...right, numbers[index]], left - numbers[index]);
            iter(index + 1, right, left);
    }

        let result = [];
        iter(0, [], sum);
        if(result.length === 0){
            setLostGame(true)
        }
    }
}
console.log('lost game??', lostGame)
function finalScore(){
    const unUsedPieces = totalScore.filter(score => !score.isCompleted)
    const finalSum = unUsedPieces.reduce((acc, c) => acc + c.value,0 ) 
    return finalSum
}





console.log('easy mode?',easyMode)

const scoreRemaining = sumOfRolls - matchTheScore.reduce((acc,c) => acc + c, 0)

  const diceElements = dice.map((die)=> (
    <Die 
        key={die.id}
        value={die.value}
        sumOfRolls={sumOfRolls}
        setSumOfRolls={setSumOfRolls}
        /> 
  ))
  const scoreElements = totalScore.map((score)=> (
    <Score 
        key={score.id}
        id={score.id}
        value={score.value}
        isUsed={score.isUsed}
        isCompleted={score.isCompleted}
        handleScoreClick={()=> handleScoreClick(score.id, score.value, score.isUsed)}
        /> 
  ))
  
    return (
        <div className="container">
            {beatGame ? "GOOD JOB!!!": null}
            <h1> Shut the Box</h1>
            <ToggleSwitch
             easyMode={easyMode} 
             toggleEasyMode={() =>setEasyMode(!easyMode)} 
             />
            <div className="score-container">
                {scoreElements}
            </div>
            <div className="match-container">
            
            
                
                <div className="match-scores">
                {matchTheScore.map(num => <p key={num} className="match-scores-num"> {num}</p>)}
        </div>
            
            <div className="score-submit">
                {lostGame ? <p>Final Score: {finalScore()}</p> : <p>Remaining: {scoreRemaining}</p>}
                {/* <button className="submit-button" 
                onClick={submitMatchScore}> Submit </button> */}
            </div>
            </div>
            <div className="player-button-container">
                {easyMode ? <button className="new-roll-button" onClick = {newRoll}> New Roll </button> : null}
                <button className="submit-button" 
                onClick={ lostGame || beatGame ? restartGame : submitMatchScore}> {lostGame ? 'Restart Game ' : 'Submit' }</button>
                </div>
            <div className="dice-container">
                <div className="players-role">
                    <p>Your Roll:</p>
                {diceElements}
                </div>
                <div className="sum-of-rolls">
                    <p>Goal:</p>
                <h4 className="die"> {sumOfRolls}</h4>
                </div>
        
            </div>
            
        </div>
  )
}
