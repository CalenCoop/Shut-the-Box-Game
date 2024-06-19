import React from 'react'

export default function ToggleSwitch(props){
    return(
        <div className="outer-switch-container">

        
        <div className="span-container">
        <span className="switch-span">Easy Mode: </span>
        </div>
    <div className="switch-container">
        <input
          checked= {props.easyMode}
          onChange={props.toggleEasyMode}
          className="switch-checkbox"
          id={`toggleSwitch`}
          type="checkbox"
        />
        <label
        style={{background: props.easyMode && '#06D6A0'}}
          className="switch-label"
          htmlFor={`toggleSwitch`}
        >
          <span className={`switch-button`}></span>
        </label>
    </div>
    </div>
    )
}