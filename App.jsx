import React from "react"
import Score from "./components/Score"
import Die from "./components/Die"
import { nanoid } from "nanoid"

export default function App() {
  const [dice, setDice] = React.useState([])
  const [totalScore, setTotalScore] = React.useState(startingScore())
  const [sumOfRolls, setSumOfRolls] = React.useState(0)
  const [matchTheScore, setMatchTheScore] = React.useState([])

  React.useEffect(()=> {
    newRoll()
  },[])

  

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

console.log("match", matchTheScore)
// console.log(totalScore)

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
console.log('sumofRolls',sumOfRolls)
console.log(totalScore)











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
            <h1> Shut the Box</h1>
            <div className="score-container">
                {scoreElements}
            </div>
            <div className="match-scores">
                {matchTheScore.map(num => <p key={num} className="match-scores-num"> {num}</p>)}
            </div>
                {/* {matchTheScore.map(num => (
                    <p className="match-scores"> 
                    {num}
                    </p>
                ))} */}
            <button className="submit-button" onClick={submitMatchScore}> Submit </button>
            <div className="dice-container">
                {diceElements}
                <h4 className="die"> {sumOfRolls}</h4>
        
            </div>
                <button className="new-roll-button" onClick = {newRoll}> New Roll </button>
        </div>
  )
}
