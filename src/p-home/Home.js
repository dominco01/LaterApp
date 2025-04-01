import React, { useContext, useEffect } from 'react';

import MainName from '../components/MainName';
import GameBox from './components/GameBox';

import style from "./Home.module.css"
import { NotificationContext } from '../context/NotificationContext';
import { DialogContext } from '../context/DialogContext';
import classNames from 'classnames';
import { GameSet } from '../models/consts';
import { CodeContext } from '../context/CodeContext';
import { AccountContext } from '../context/AccountContext';


const Home = () => {

    const {isNotification,showNotification} = useContext(NotificationContext);
    const {saveCode,isCodeUsed,tryDeleteCodeUsed} = useContext(CodeContext);
    const {isDialog} = useContext(DialogContext);
    const {balance} = useContext(AccountContext);

    useEffect(()=>{
        let timeout = setTimeout(() => {

            if(!isCodeUsed(0)) saveCode(0,"Hello new player! Ready to start?");
            else if(balance===0)
            {
                tryDeleteCodeUsed(3) 
                saveCode(3,"You broke, ah... here we go again...");
            }
        
        }, 5000);
        return ()=>clearTimeout(timeout);
    },[])

    useEffect(()=>{
        if(isNotification){
            let timeout = setTimeout(()=>showNotification(),1000);
            return ()=>clearTimeout(timeout)
        } 
    },[isNotification])

    return (
    <div>
        <div className={"blurable fade " +classNames({"blured":isDialog})}>
        <h1 style={{'textAlign':'center',marginTop:"70px"}} >Hello,<MainName/>!</h1>
        
        <div className={style.flex}>
            <div>
                <GameBox disabled={balance<=0} game={GameSet.getMainGame()} main />
            </div>
            
            <div>
                {GameSet.getOtherGames().map((game,i)=>
                    <GameBox key={i} disabled={balance<15} game={game}/>
                    )}
            </div>
        </div>
        </div>
    </div>
    );
}
 
export default Home;