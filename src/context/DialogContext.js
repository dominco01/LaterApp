import React, {  useState } from "react";
import InputDialog from "../components/InputDialog";
import TextDialog from "../components/TextDialog";

export const DialogContext = React.createContext();

const DialogProvider = ({children}) => {

    const [textDialog,setTextDialog] = useState(null);//title text onClose
    const [inputDialog,setInputDialog] = useState(null);//text onClose

    const handleSetInputDialog=(text,onClose)=>{
        setInputDialog({text:text,onClose:onClose})
    }

    const handleSetTextDialog=(title,text=null,bold=null)=>{
        setTextDialog({title:title,text:text,bold:bold})
    }

    const value = {
        textDialog:textDialog,
        setTextDialog:handleSetTextDialog,
        inputDialog:inputDialog,
        setInputDialog:handleSetInputDialog,
        isDialog:inputDialog!==null || textDialog!==null
    }

    return ( 
    <DialogContext.Provider value={value}>
        {children}
        {inputDialog && <InputDialog text={inputDialog.text} onClose={(value) =>{inputDialog.onClose(value);setInputDialog(null);}}/>}
        {textDialog && !inputDialog  && <TextDialog title={textDialog.title} text={textDialog.text} bold={textDialog.bold} onClose={() =>{setTextDialog(null)}}/>}
    </DialogContext.Provider> );
}
 
export default DialogProvider;