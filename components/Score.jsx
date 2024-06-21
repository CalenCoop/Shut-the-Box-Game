import React from 'react'

export default function Score(props){

return (
    <div className={ props.isCompleted ? 
    "score grey-wood"
    : !props.isUsed ? "score wood-grain": "score light-wood" }>
        <button className={props.isCompleted ? 
            'score-button complete-score-button' : !props.isUsed ?  'score-button incomplete-score-button ' :'score-button used-score-button' } onClick={ !props.isCompleted ? props.handleScoreClick : null}>
        <h2> {props.value}</h2>
        </button>
    </div>
    )
}