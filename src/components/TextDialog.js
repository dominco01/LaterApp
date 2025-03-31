import React  from 'react';
import "./Dialog.css"

const TextDialog = ({title,text,bold,onClose}) => {

  return (
    <div className="fade">
        <div style={{"zIndex":99}} className={"centered dialog-box darker-color"}>
            <button className="close-button" onClick={onClose}>
              <span role="img" aria-label="close">❌</span>
            </button>
            <div>{title}</div>
            {text && <div style={{"marginTop":"10px",fontSize:"24px"}}>{text} <b style={{fontSize:"24px"}}>{bold}</b></div>}
        </div>
    </div>
  );
}
 
export default TextDialog;