import React, { useState } from "react";

export const AccountContext = React.createContext();

const AccountProvider = ({children}) => {

    const [balance,setBalance] = useState(getLocalNumber("balance"));
    const [xp,setXp] = useState(getLocalNumber("xp"));
    
    const chargeBalance = (value)=>{
        localStorage.setItem("balance",balance+value);
        setBalance(balance+value);
    }

    const chargeXp = (value)=>{
        localStorage.setItem("xp",xp+value);
        setXp(xp+value);
    }

    const value = {
        balance:balance,
        getBalance:()=>{return balance},
        xp:xp,
        chargeBalance:(value)=>chargeBalance(value),
        chargeXp:(value)=>chargeXp(value),
    }

    return ( 
    <AccountContext.Provider value={value}>
        {children}
    </AccountContext.Provider> );
}

const getLocalNumber = (str)=>{
    if(!localStorage.getItem(str)) localStorage.setItem(str,0);
    return Number(localStorage.getItem(str));
}
 
export default AccountProvider;