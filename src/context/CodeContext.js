import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { codes, codesValue, noToUseCodes } from "../models/consts";
import { AccountContext } from "./AccountContext";
import { DialogContext } from "./DialogContext";
import { NotificationContext } from "./NotificationContext";

export const CodeContext = React.createContext();

//usage: see value array
const CodeProvider = ({children}) => {

    const {setNotification} = useContext(NotificationContext);
    const {inputDialog,setInputDialog,setTextDialog} = useContext(DialogContext);
    const {chargeBalance} = useContext(AccountContext);

    const [isCodeDialogOpen,setIsCodeDialogOpen]=useState(null);

    const verifyCode= (code)=>{
        if(code)
        {
            if(codesValue[code])
            {
                let codeId = codeToCodeId(code);
                if(isCodeUsed(codeId))
                {
                    setTextDialog("You already used this code...")
                } 
                else if(!noToUseCodes.includes(Number(codeId)) && !isCodeToUse(codeId) )
                {
                    setTextDialog("Are u a cheater?") 
                }
                else
                {
                    addUsedCode(codeId);
                    chargeBalance(codesValue[code]);
                }
            }
            else setTextDialog("Unknown code :(")
        }
    }

    useEffect(()=>{
        if(isCodeDialogOpen) setInputDialog("Type a secret code:",verifyCode)
    },[isCodeDialogOpen])

    const handleOpenCode=()=>{
        if(!isCodeDialogOpen) setIsCodeDialogOpen(true);
    }

    useEffect(()=>{
        if(!inputDialog) setIsCodeDialogOpen(false);
    },[inputDialog])

    const handleSaveCode=(codeId,description)=>{
        if(codes[codeId])
        {
            if(!isCodeToUse(codeId)) addCodeToUse(codeId);
            setNotification(description,"Use code: ",codes[codeId]);
        }else console.log("Save code failed")
    }

    const addCodeToUse = (codeId)=>{
        let code = codes[codeId];
        let a = localStorage.getItem("codesToUse");
        let arr = JSON.parse(a);
        if(arr){ arr.push(code); }
        a = arr ? JSON.stringify(arr) : JSON.stringify([code]);
        localStorage.setItem("codesToUse",a);
    }

    const addUsedCode = (codeId)=>{
        let code = codes[codeId];
        let a = localStorage.getItem("usedCodes");
        let arr = JSON.parse(a);
        if(arr){ arr.push(code); }
        a = arr ? JSON.stringify(arr) : JSON.stringify([code]);
        localStorage.setItem("usedCodes",a);
    }
    
    //const removeFromCodeToUse - narazie niepotrzebne

    const isCodeToUse = (codeid)=>{//is code in codesToUse
        let a = localStorage.getItem("codesToUse");
        if(!a) return false;
        a = JSON.parse(a);
        return a.includes(codes[codeid])
    }

    const isCodeUsed= (codeid)=>{//is code in usedCodes
        let a = localStorage.getItem("usedCodes");
        if(!a) return false;
        a = JSON.parse(a);
        return a.includes(codes[codeid])
    }

    const tryDeleteCodeUsed=(codeid)=>{
        if(!isCodeUsed(codeid))return;
        let a = localStorage.getItem("usedCodes");
        a = JSON.parse(a);
        a = a.filter(id => codeid !== id)
        localStorage.setItem("usedCodes",JSON.stringify(a))
    }

    const codeToCodeId=(code)=>{
        return Object.keys(codes).find(id => codes[id] === code);
    }

    const value = {
        isCodeDialogOpen:isCodeDialogOpen,
        openCodeDialog:handleOpenCode,
        saveCode:handleSaveCode,
        isCodeUsed:isCodeUsed,
        tryDeleteCodeUsed:tryDeleteCodeUsed,
    }

    return ( 
        <CodeContext.Provider value={value}>
            {children}
        </CodeContext.Provider> );
}

export default CodeProvider