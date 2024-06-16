import React from 'react'

export default function Die(props){
return (
    <div className="die">
        <h2 className='dice-number'> {props.value}</h2>
    </div>
)
}