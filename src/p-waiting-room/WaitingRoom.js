import React, { useContext }  from 'react';
import { useParams } from 'react-router';
import { DialogContext } from '../context/DialogContext';
import { GameSet } from '../models/consts';
import RoomList from './components/RoomList';
import style from './local.css'

const WaitingRoom = () => {

    let { id } = useParams();

    let game = GameSet.getGame(id);
    
    const {isDialog} = useContext(DialogContext);

    return ( 
        <div className={"blurable " + (isDialog?"blured":"") + " layout"} >
            <div className={style.content}>
                <RoomList gameId={game.id}/>
            </div>

            <div>
                <h2>{game.name}</h2>
                <div className="layout-info">ABOUT
                    <div>{game.about()}</div>
                </div>
                <div className="layout-info">INFO
                    <div>Points: {game.points.join("pkt, ")}pkt</div>
                    <div>Game type: {game.type}</div>
                    <div>Avg. round time: {game.getRoundTime()}s</div>
                    <div>{game.handDeckSize} hand cards</div>
                    <div>{game.tableDeckSize} table cards</div>
                </div>
                <div className="layout-info">RULES
                    <div>Card closest to the one on the table wins</div>
                    <div>If figure is the same - color matters</div> 
                    <div>Last round has higher punctation</div>
                    <div>So play smart, play LATER!</div>
                    <div>Use code: rules ;)</div>
                </div>
            </div>
        </div>
     );
}

export default WaitingRoom;