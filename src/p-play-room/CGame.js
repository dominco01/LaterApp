import React, { useRef }  from 'react';
import { useParams } from 'react-router';
import { HandDeck, TableDeck} from '../models/decks';
import { useState } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import GameStatus from './components/gamestatus';
import { CHand, CMyHand, CTable } from './components/CHand';
import {Flop} from '../models/flops'
import { GameType } from '../models/game';
import { DialogContext } from '../context/DialogContext';
import { AccountContext } from '../context/AccountContext';
import Timer from './components/timer';
import { GameSet } from '../models/consts';
import style from './local.css'
import classNames from 'classnames';
import {Name} from '../components/Name';
import { Link } from 'react-router-dom';
import { CodeContext } from '../context/CodeContext';
import Wave from './components/Wave';
import { Figure } from '../models/cards';
import { Random } from '../models/random';

const test = false;

const CGame = () => {

    //phases: ready-startround-accept-endround
    
    const {isDialog,setTextDialog}  = useContext(DialogContext)
    const {balance,chargeBalance,chargeXp}           = useContext(AccountContext);
    const {isCodeUsed,tryDeleteCodeUsed,saveCode}     = useContext(CodeContext);

    const { id, myColor,opName,enterPrice } = useParams();
    const game = GameSet.getGame(id);

    const [myHandDeck,setMyHandDeck] = useState(null);
    const [opHandDeck,setOpHandDeck] = useState(null);
    const [tableDeck,setTableDeck] = useState(null);
    const [myFlop,setMyFlop] = useState(null);//useless troche ale no.
    const [opFlop,setOpFlop] = useState(null);
    const [tableFlop,setTableFlop] = useState(null);

    const [amIReady,setAmIReady] = useState(false);
    const [isOpReady,setIsOpReady] = useState(false);

    const [isAcceptable,setIsAcceptable] = useState(false);
    const [isOpAcceptable,setIsOpAcceptable] = useState(false);
    const [isOpQuit,setIsOpQuit] = useState(false);
    const [myAcceptedIndex,setMyAcceptedIndex]=useState(null);//=> isAccpetable=true
    const [opAcceptedIndex,setOpAcceptedIndex]=useState(null);//=> isAccpetable=true

    const opSimulation= useRef(null);

    const [timerSets,setTimerSets] = useState(null);  
    const handleTimerEndString = useRef("null");  

    const [isShow,setIsShow]=useState(false);
    const [gameStatus,setGameStatus]=useState(null);//true -myWin, false- opWin //can get round info //setter uzywany tylko raz na runde! //jesli null to przygotowania na razie
    const [tableHands,setTableHands]=useState([]);// {up:card, down:card} 

    const [isExchange,setIsExchange]= useState(false);

    const getRoundTime = ()=>{return game.getRoundTime(gameStatus.length) }

    useEffect(()=>{
        if(!test)
        {
            const timeout = setTimeout(()=>{
                setIsOpAcceptable(true);//for ready button
                setIsAcceptable(true);//for ready button
                const timeout2 = setTimeout(()=>{OpReady()},1000*(3+Random.getRandom(3)));//op player ready (3-5s)
                return ()=>clearTimeout(timeout2);
    
            },1000);
            return ()=>clearTimeout(timeout);
        }
        else
        {
            setIsOpAcceptable(true);
            setIsAcceptable(true);
            OpReady()
        }
        
    },[]);

    const IReady = ()=>{ 
        setIsAcceptable(false);//ready button
        setAmIReady(true);
        setMyHandDeck(HandDeck.New(game.handDeckSize,myColor)); 
        setMyFlop(Flop.New(game.handDeckSize));
    }
    const OpReady = ()=>{
        setIsOpAcceptable(false);//ready button
        setIsOpReady(true);
        setOpHandDeck(HandDeck.New(game.handDeckSize,myColor==="red"?"black":"red")); 
        setOpFlop(Flop.New(game.handDeckSize));
    }
    useEffect(()=>{
        if(amIReady && isOpReady)
        {
            setIsExchange(true);
            setMyFlop(Flop.Copy(myFlop).showAll()) //pokazuje karty , w celu wymiany

            if(!test)chargeBalance(-enterPrice);//ACCOUNT
    
            restartTimer("readyDeckTimer", 10 ,true);
        }
    },[amIReady,isOpReady])

    const handleOnAccept=(index)=>{
        if(!myHandDeck){
            if(balance<enterPrice) setTextDialog("Not enough money to play.","");
            else IReady();
        } 
        else setMyAcceptedIndex(index);
    }

    useEffect(()=>{
        if(myAcceptedIndex!==null && opAcceptedIndex!==null) endRound();
        else if(myAcceptedIndex!==null || opAcceptedIndex!==null) setTimerSets({time:getRoundTime()/2})

        if(myAcceptedIndex!==null && isAcceptable)setIsAcceptable(false);
        if(opAcceptedIndex!==null && isOpAcceptable)setIsOpAcceptable(false);
    },[myAcceptedIndex,opAcceptedIndex])

    const startRound =()=>{

        //pokazanie kart
        if(!myFlop.isShowAll())setMyFlop(Flop.Copy(myFlop).showAll())
        if(!opFlop.isShowAll() && game.type===GameType.OpenCards) setOpFlop(Flop.Copy(opFlop).showAll())

        //pokazanie karty
        setTableFlop(Flop.Copy(tableFlop).showNext())

        //wlaczenie dotykalnosci
        setIsAcceptable(true);
        setIsOpAcceptable(true);

        //zaczecie myslenia
        simulateOp();

        //end
        restartTimer("startRoundTimer", getRoundTime() ,false);
    }

    const forceEndRound=()=>{
        if(myAcceptedIndex===null)setMyAcceptedIndex(myHandDeck.getRandomIndex())
        if(opAcceptedIndex===null)setOpAcceptedIndex(opHandDeck.getRandomIndex())
    }

    const endRound = ()=>{
        //clear opSimulation
        clearInterval(opSimulation.current);

        //show
        setIsShow(true);

        //pokazuje karty
        if(game.type===GameType.HiddenCards) setOpFlop(Flop.Copy(opFlop).show(opAcceptedIndex))
        
        restartTimer("endRoundTimer",5,true);
    }

    function onTimerEnd()
    {
        if(handleTimerEndString.current==="startRoundTimer") startRoundTimer(); 
        else if (handleTimerEndString.current==="endRoundTimer")endRoundTimer();
        else if (handleTimerEndString.current==="readyDeckTimer") readyDeckTimer();
    }
    const startRoundTimer = ()=>{forceEndRound();} //if round timer ends
    //if ready section ends
    const readyDeckTimer = ()=>{
        setTableDeck(TableDeck.New(game.tableDeckSize,myHandDeck,opHandDeck)); 
        setTableFlop(Flop.New(game.tableDeckSize));
        setIsExchange(false);
        setTimeout(()=>setGameStatus([]),1000);
    } 
    //if ending timer ends
    const endRoundTimer=()=>{
        let myCard = myHandDeck.getCard(myAcceptedIndex)
        let opCard = opHandDeck.getCard(opAcceptedIndex)
        let tableCard = tableDeck.getCard(gameStatus.length);

        //usuwa karty
        setMyHandDeck(HandDeck.Copy(myHandDeck).takeOffCardByIndex(myAcceptedIndex))
        setOpHandDeck(HandDeck.Copy(opHandDeck).takeOffCardByIndex(opAcceptedIndex))

        //zerowanko
        setMyAcceptedIndex(null);
        setOpAcceptedIndex(null);
        setIsShow(false);
    
        //dodaje do tableHands
        let arr = [...tableHands];
        arr.push({up:opCard,down:myCard})
        setTableHands(arr);

        //dodaje do gameStatus
        arr = [...gameStatus];
        arr.push(myCard.isCloser(opCard,tableCard));
        setGameStatus(arr); //przy zmianie statusu => nowa runda hanler
    }

    useEffect(()=>{
        if(gameStatus!==null)
        {
            if(gameStatus.length<game.getMaxRounds()) startRound();
            else
            {
                let greens = countGreens();
                let myPoints = countPoints();
                if(game.isWin(myPoints))
                {
                    setTextDialog("YOU WON","GGs!");
                    if(gameStatus.length === greens) 
                    {
                        if(!isCodeUsed(2)) saveCode(2,"Your first all-green win! Grab a reward.");
                        else{
                            tryDeleteCodeUsed(4) 
                            saveCode(4,"All-green win! GGs!");
                        }
                    }
                    
                    chargeBalance(enterPrice*2);
                }
                else if(game.isDraw(myPoints))
                {
                    setTextDialog("YOU DREW","Even gameplay.");
                    chargeBalance(enterPrice);
                }
                else
                {
                    setTextDialog("YOU LOSE","Better luck next time...");                
                }
                
                chargeXp(greens*10);

                leaveOp();
            }
        }
    },[gameStatus])

    const simulateOp = ()=>{
        opSimulation.current = setInterval(()=>{
            let range = getRoundTime()/5;
            if(isEndRound()) range = 2;
            else if(myAcceptedIndex) range = 3;
            else if(Random.getRandom(5)===1) range=3;//extra

            if(Random.getRandom(range)===1)//gdy roundtime =30 to 12s,
            {
                setOpAcceptedIndex(opHandDeck.getRandomIndex());
                clearInterval(opSimulation.current);
            }
        },2000);
    }
    const leaveOp=()=>{
        setTimeout(()=>{
            setIsOpQuit(true);
        },(4+Random.getRandom(7))*1000)//4s - 10s
    }

    function restartTimer(handler,time,dotted){
        setTimerSets({time:time,reset:true,dotted:dotted});
        handleTimerEndString.current =handler;
    }

    const countPoints = () =>{
        let cnt = 0;
        game.points.forEach((point,index) => {
            if(gameStatus[index]) cnt+= point;
        });
        return cnt;
    }
    const countGreens=()=>{
        let cnt = 0;
        gameStatus.forEach(status => {
            if (status===true)cnt++;
        });
        return cnt;
    }

    const getShow=(my)=>{
       return {index:(my?myAcceptedIndex:opAcceptedIndex),isActive:isShow,cardPreview:(my?true:(game.type!==GameType.OpenCards))}
    }

    const isEndRound = ()=>{
        return gameStatus===null ? false : gameStatus.length===game.getMaxRounds();
    }
    const getWaveCode = ()=>{
        if(!tableDeck) return null;
        return tableDeck.getWaveCode();
    }

    const onExchangeHandle = ()=>{
        setMyHandDeck(HandDeck.New(game.handDeckSize,myColor)); 
    }

    return ( 
        <div className={"blurable " +classNames({"blured":isDialog} )+" layout"} >

            <div className={style.timer}>
                <Timer sets={timerSets} onEnd={()=>onTimerEnd()}/>
            </div>

            <div className={style.handtable+" fade"}>
                {!isOpQuit && <Name bold name={opName}/> }
                {isOpQuit && <Name bold name={"[opponent left]"}/> }
                <CHand initSize={game.handDeckSize} handDeck={opHandDeck} flop={opFlop} isAcceptable={isOpAcceptable} show={getShow(false)}/>
                <CTable initSize={game.tableDeckSize} tableDeck={tableDeck} flop={tableFlop} tableHands={tableHands}/>
                <CMyHand initSize={game.handDeckSize} handDeck={myHandDeck} flop={myFlop} isAcceptable={isAcceptable}
                    onAccept={(index)=> handleOnAccept(index)}
                    show={getShow(true)}
                    enterPrice={enterPrice}
                    isExchange={isExchange}
                    onExchange={onExchangeHandle}/>
                <Name bold myname/>
            </div>

            <div className={style.wave}>
                <Wave size={game.tableDeckSize} code={getWaveCode()}/>
            </div>

            <div className={style.sidebar } >
                <h2>{game.name}</h2>
                <div className="layout-info">WIN PRICE
                    <div className="layout-info-big"><ins>{enterPrice}$</ins> {enterPrice*2}$ <ins>{enterPrice}$</ins></div>
                </div>
                <GameStatus points={game.points} gameStatus={gameStatus}/>
                <div className="layout-info">RULES
                    <div>Card closest to the one on the table wins</div>
                    <div>If figure is the same - color matters</div>
                    <div>Last round has higher punctation</div>
                    <div>So play smart, play LATER!</div>
                    <div>Use code: rules ;)</div>
                </div>
                <div className="layout-info">INFO
                    <div>Drag card to switch its position</div> 
                    <div>The mini panel represents card's figures comparison</div>
                    <div>Card's order: {Object.keys(Figure).join(" ")}</div>
                </div>
                {isEndRound() && <Link to={{ pathname: ('/')}}>
                    <div className={style.quit +" hoverable"}>QUIT</div>
                </Link>}
            </div>
        </div>
        
     );
}

export default CGame;
