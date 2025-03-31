import React from 'react';
import {useRef} from 'react';
import "./Dialog.css"

const InputDialog = ({text,onClose}) => {

  const inputRef = useRef("");

  const onSubmit = () =>{
    onClose(inputRef.current.value);
  }

  return (
    <div >
        
        <div style={{"zIndex":100}} className={"centered dialog-box fade darker-color"}>
            <button className="close-button" onClick={()=>onClose()}>
              <span role="img" aria-label="close">❌</span>
            </button>
            <div>{text}</div>
            <div style={{"margin":"20px"}}>
              <input type="text" maxLength="15" ref={inputRef}/>
              <button onClick={onSubmit}>OK!</button>
            </div>
        </div>
    </div>
  );
}
 
export default InputDialog;