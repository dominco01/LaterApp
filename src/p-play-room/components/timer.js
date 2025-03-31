import React, { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import style from './local.css'

const Timer = ({sets,onEnd}) => { // {time,reset,dotted=null}
    
    const [time,setTime]=useState(0);
    const [isRed,setIsRed]=useState(false);
    const isDotted=useRef(false);

    useEffect(()=>{
        if(!sets)return;
        
        if(sets.reset)
        {
            if(isRed) setIsRed(false);
            isDotted.current=sets.dotted?sets.dotted:false;
            let interval =startTimer(sets.time);
            return ()=>clearInterval(interval);
        }
        else if(sets.time< time) 
        {
            setIsRed(true);
            let interval =startTimer(sets.time);
            return ()=>clearInterval(interval);
        }
    },[sets]);

    const startTimer=(time)=>{
        let curr = time;
        setTime(curr);
        let interval = setInterval(()=>{
            setTime(--curr);
            if(curr===0)
            {
                clearInterval(interval);
                onEnd();
            }
        },1000);
        return interval
    }

    const getTimerFormat=()=>{
        if(isDotted.current) return ".".repeat(time);
        return time?(time+"s"):"TIMER";
    }
    
    return ( <div className={"darker-color forth-color "+style.timer+" "+(isRed?style.redTimer:style.defaultTimer)} >{getTimerFormat()} </div> );
}
 
export default Timer;
