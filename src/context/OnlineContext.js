
import React, { useEffect, useState } from 'react'

const consts={
    refreshTime:10,
    initTotalPlayers:420,
    initTotalPlayersDelta:100,
    initGamePlayers:100,
    initGamePlayersDelta:20,
    totalPlayersDelta:5,
    gamePlayersDelta:4,
}

export const OnlineContext = React.createContext();

const OnlineProvider = ({children})=>
{
    //const [gamePlayers,setGamePlayers] = useState(getInitGamePlayers());// {red, black}
    const [totalPlayers,setTotalPlayers] = useState(getInitTotalPlayers());

    useEffect(() => {
        var initTotalPlayers = totalPlayers;
        //var initGamePlayers = gamePlayers;

        const interval = setInterval(() => {

            //total
            let rand = getRandom(consts.totalPlayersDelta);
            if(totalPlayers>initTotalPlayers) setTotalPlayers(totalPlayers-rand)
            else setTotalPlayers(totalPlayers+rand);

            //game
            /*
            let red = gamePlayers.red;
            let black = gamePlayers.black;
            rand = getRandom(consts.gamePlayersDelta);
            if(red+black > initGamePlayers.red+initGamePlayers.black)
            {
                if(red>black)  setGamePlayers({red:red-rand,black:black})
                else setGamePlayers({red:red,black:black-rand})
            }
            else
            {
                if(red>black)  setGamePlayers({red:red,black:black+rand})
                else setGamePlayers({red:red,black:black+rand})
            }
            */
        }, consts.refreshTime*1000);

        return () => clearInterval(interval)
      }, []);
    

    return(
        <OnlineContext.Provider value={{/*gamePlayers,*/totalPlayers}}>{children}</OnlineContext.Provider>
    )
}

export default OnlineProvider;

//local

/*
const getInitGamePlayers =()=> {
    let all = consts.initGamePlayers+getRandomDelta( consts.initGamePlayersDelta);
    return {red:Math.floor(all/2),black:Math.floor(all/2)}
}
*/

const getInitTotalPlayers =()=> {
    return consts.initTotalPlayers+ getRandomDelta(consts.initTotalPlayersDelta)
}

//local of local

const getRandom =(range)=>{//return number between 0 - (range-1)
return Math.floor(Math.random()*range);
}

const getRandomDelta =(delta)=>{//return number between 0 - (range-1)
return -delta + getRandom(delta*2)
}