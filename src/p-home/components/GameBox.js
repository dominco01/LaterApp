import React from 'react';
import { Link } from 'react-router-dom';
import "./GameBox.css"

const GameBox = ({game,main,disabled}) => {

    return ( 
        <div className={"forth-color "+(main?"main-box":"box")}>
            
            <Link className={main?"main-head-font":"head-font"} style={{"textDecoration":"none","position":"relative"}}  to={disabled?"#":"/waiting-room/"+game.id}>
               
                <div className={"third-color "+(main?"main-head":"head")} style={{opacity:(disabled?"0.3":"1")}}>
                    {game.name}
                </div>
                {disabled &&<div className='centered'>
                <span role="img" aria-label='lock'>🔒</span>
                </div>}
            </Link>
            <div className={"foot noselect " + (main?"main-foot-font":"foot-font")}>
                <div>{game.points[0]}.{game.points[game.points.length-1]}</div>
                <div>{game.type}</div>
                <div>{game.getRoundTime()}s</div>
            </div>
        </div>
     );
}
 
export default GameBox;