import React from 'react'

export default function Score(props){
    
return (
    <div className={ !props.isCompleted ? "score wood-grain": "score grey-wood" }>
        <button className='score-button' onClick={ !props.isCompleted ? props.handleScoreClick : null}>
        <h2> {props.value}</h2>
        </button>
    </div>
    )
}