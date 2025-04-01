import React from "react";
import Status from "./status";
import style from './local.module.css'

const GameStatus = ({points,gameStatus}) => {

    const getStatus=(index)=>{
        if(!gameStatus)return null;
        return gameStatus.length>index ? gameStatus[index] : null;
    }

    return ( <div style={{display:"flex",flexDirection:"column"}}>
        <div>GAME STATUS</div>
        <div className={style.gameStatusBody}>
            {points.map((point,index) =>
            <div key={index}>
                <div>{point}pkt</div>
                <Status status={getStatus(index)}/> </div>
            )}
        </div>
    </div> );
}
 
export default GameStatus;