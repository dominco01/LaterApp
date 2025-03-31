import React, { useContext, useEffect, useState }  from 'react';
import { AccountContext } from '../context/AccountContext';
import { DarkModeContext } from '../context/DarkModeContext';
import './Account.css'
import { CodeContext } from '../context/CodeContext';
import { DialogContext } from '../context/DialogContext';
import { NotificationContext } from "../context/NotificationContext";

const test = false;

const Account = ({onCharging}) => {
    //onCharging - is balance charging up - true ; is balance charging down - false ; is not charging - null ;

    const {balance,xp} = useContext(AccountContext);
    const {isNotification}=useContext(NotificationContext);
    const {isDialog,setTextDialog} = useContext(DialogContext)
    const {isCodeDialogOpen,openCodeDialog} = useContext(CodeContext);
    const {switchDarkMode} = useContext(DarkModeContext);

    const [currBalance,setCurrBalance] = useState(0);
    const [currXp,setCurrXp] = useState(0);

    const [isBalanceCharging,setIsBalanceCharging] = useState(false);
    const [isXpCharging,setIsXpCharging] = useState(false);

    const [isNotificationIcon,setIsNotificationIcon] = useState(false);

    useEffect(()=>{
        if(balance)
        {
            if(!test)
            {
                let value = balance-currBalance;
                if(value===0) return;

                setIsBalanceCharging(true);
                onCharging(value>0);

                let curr = currBalance;
                const interval = setInterval(()=>{
                    if(value ===0){setIsBalanceCharging(false);onCharging(null);clearInterval(interval)}
        
                    let delta = delting(value);
                    
                    curr += delta;
                    setCurrBalance(curr);

                    value-=delta;
                },30)

                return ()=> {setIsBalanceCharging(false);onCharging(null);clearInterval(interval)}
            }
            else setCurrBalance(balance)
            
        }

    },[balance])

    useEffect(()=>{

        if(xp)
        {
            if(!test)
            {
                let value = xp-currXp;
                if(value===0) return

                setIsXpCharging(true);

                let curr = currXp;
                const interval = setInterval(()=>{
                    if(value ===0) {setIsXpCharging(false);clearInterval(interval)}
        
                    let delta = delting(value);
                    
                    curr += delta;
                    setCurrXp(curr);
    
                    value-=delta;
                },30)
    
                return ()=> {setIsXpCharging(false);clearInterval(interval)}
            }
            else setCurrXp(xp);
            
        }
        
    },[xp])

    useEffect(()=>{
        if(isNotification) setIsNotificationIcon(true);
    },[isNotification])



    const handleOpenInfoXp = ()=>{
        setTextDialog("GGs points","Gained Greens, aka XP, calculated by the single rounds won * 10.")
    }
    
    const handleOpenCodeDialog = ()=>{
        setIsNotificationIcon(false);
        openCodeDialog();
    }

    return (
    <div className="acc" >
        <div className='acc-box darker-color-box'>
            <div style={{scale:(isXpCharging?"1.2":"1")}}>{currXp}GGs</div>
            <button className={(!isDialog? 'scale-hoverable':"")} onClick={handleOpenInfoXp}>i </button>
        </div>
        
        <div className='acc-box' >
            <div className='darker-color' style={{scale:(isBalanceCharging?"1.2":"1")}}>{currBalance}$ </div>
            <div className='notification'>
                <button className={("darker-color "+(!isCodeDialogOpen? 'scale-hoverable':""))} onClick={handleOpenCodeDialog}>+</button>
                {isNotificationIcon && <span></span>}
            </div>
            
        </div>
        
        <label className="switch">
            <input type="checkbox" onClick={()=>switchDarkMode()} defaultChecked/>
            <span className="slider round"> </span>
        </label>
        
    </div>  );
}
 
export default Account;

const delting = (value) =>{
    return value>0? Math.ceil(value/30):Math.floor(value/30);
}


    

    