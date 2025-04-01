import React, { useRef, useState } from "react";
import {CCard } from "./CCard";
import style from './CHand.module.css'
import { useEffect } from "react";

export const CHand = ({initSize,handDeck,flop,isAcceptable,show={index:-1,isActive:false,cardPreview:false}}) => {
    //handDeck nullable, ex. [null,card,card,null,null], state
    //flop nullable, ex. [false,true,true,false,false], state
    //show - index, isActive, cardPreview

    const isNull = (id)=>{ //zalezne tylko od handdeck
        if(!handDeck || !flop) return null;
        return handDeck.getCard(id);
    }

    const getOpacity = ()=>{
        return (!isAcceptable && !show.isActive?"0.5":"1")
    }

    const getCardOpacity = (index)=>{
        return ((show.isActive && show.index!==index) ?"0.5":"1")
    }

    const getTranform =(index)=>{
        return "translate(0,"+((index===show.index && (show.cardPreview||show.isActive)) ?"25px":"0")+") "
    }

    //drag and drop
    const [orders,setOrders] = useState([...Array(initSize).keys()]);//cardIndex = orders[boxid] 
    const dragItem = useRef(null); //zapisywane jest boxid
    const dragOverItem = useRef(null); //zapisywane jest boxid
    const trySwitchOrder = ()=>{
        if(!isAcceptable) return;
        if(dragItem.current===null) return;
        if(dragOverItem.current===null) return;

        let boxid1 =dragItem.current;
        let boxid2= dragOverItem.current;
        let arr = [...orders];
        [arr[boxid1],arr[boxid2]] = [arr[boxid2],arr[boxid1]]
        setOrders(arr);

        dragItem.current = null;
        dragOverItem.current = null
    }

    return (
        <div style={{"position":"relative"}}>
            <div className={style.divflex+" " +style.hand+" forth-color"} style={{opacity:getOpacity()}}>
                { orders.map((cardIndex,index)=>
                    <div key={index} 
                    onDragStart={()=>{dragItem.current = index}}
                    onDragEnter={()=>{dragOverItem.current = index}}
                    onDragEnd={trySwitchOrder}
                    >
                        {isNull(cardIndex) &&
                        <div style={{transition:"transform 0.2s ease-in",
                        transform:getTranform(cardIndex),
                        opacity:getCardOpacity(cardIndex)}}>

                        <CCard card={handDeck.getCard(cardIndex)} isFlipped={flop.getFlip(cardIndex)}/>
                            
                        </div>}
                    </div>
                )}
            </div>
        </div>
         );
}


const maxExchangeAttempts = 3;
export const CMyHand = ({
    initSize,handDeck,flop,isAcceptable,onAccept,
    show={index:-1,isActive:false,cardPreview:true},
    enterPrice,
    isExchange,
    onExchange
    }) => { 
    //isAcceptable-state ,
    //handDeck nullable, ex. [null,card,card,null,null], state
    //flop nullable, ex. [false,true,true,false,false], state
    //show - index, isActive,cardPreview

    const [toggledCardIndex,setToggledCardIndex] = useState(null);
    const [exchangeAttempts,setExchangeAttempts] = useState(maxExchangeAttempts);

    useEffect(()=>{if(isAcceptable===false) setToggledCardIndex(null)},[isAcceptable])

    const handleToggle = (index)=>{
        if(index===toggledCardIndex) setToggledCardIndex(null);
        else setToggledCardIndex(index);
    }
    const handleAccept = (index)=>{
        onAccept(index);
    }

    const isNull = (id)=>{ //zalezne tylko od handdeck
        if(!handDeck || !flop) return null;
        return handDeck.getCard(id);
    }

    const getOpacity = ()=>{
        return (!isAcceptable && !show.isActive?"0.5":"1")
    }

    const getCardOpacity = (index)=>{
        return (isAcceptable || (show.isActive && show.index===index) ?"1":"0.5")
    }

    const getTranform =(index)=>{
        return "translate(0,"+((index===toggledCardIndex 
            || (show.cardPreview===null && index===show.index)
            || (show.cardPreview===true && index===show.index)) ?"-30px":"0")+") "
    }
    
    //drag and drop
    const [orders,setOrders] = useState([...Array(initSize).keys()]);//cardIndex = orders[boxid] 
    const dragItem = useRef(null); //zapisywane jest boxid
    const dragOverItem = useRef(null); //zapisywane jest boxid
    const trySwitchOrder = ()=>{
        if(!isAcceptable) return;
        if(dragItem.current===null) return;
        if(dragOverItem.current===null) return;

        let boxid1 =dragItem.current;
        let boxid2= dragOverItem.current;
        let arr = [...orders];
        [arr[boxid1],arr[boxid2]] = [arr[boxid2],arr[boxid1]]
        setOrders(arr);

        dragItem.current = null;
        dragOverItem.current = null
    }
    
    //sort order
    //5,null,null,K,Q => null,null,5,Q,K => null,null,0,4,3 => 1,2,0,4,3
    const trySort=()=>{
        if(!handDeck)return;
        if(!isAcceptable) return;

        let cards = handDeck.getCards()

        let sorted = [...cards];
        sorted.sort(function(a,b){
            if(a===null&&b===null)return 0;
            if(a===null)return -1;
            if(b===null)return 1;
            return a.figure-b.figure; 
        });

        sorted = sorted.map(scard=>{
            if(scard!==null) return cards.findIndex((card)=>{if(card===null)return false; return card.equal(scard)}) 
            return null
        })

        let cnt=0;
        cards.forEach((card,index) => {  if(card===null) sorted[cnt++]=index; });

        console.log(sorted);

        setOrders(sorted);
    }

    const tryExchange = ()=>{
        if(exchangeAttempts>0)
        {
            onExchange();
            setExchangeAttempts(exchangeAttempts-1);
        }
    }

    return (
        <div style={{"position":"relative"}}>
        <div className={style.divflex+" "+style.hand+" forth-color"} style={{opacity:getOpacity()}}>
            { orders.map((cardIndex,index)=>
            <div key={index} 
            onDragStart={()=>{dragItem.current = index}}
            onDragEnter={()=>{dragOverItem.current = index}}
            onDragEnd={trySwitchOrder}
            >
                    {isNull(cardIndex) && 
                    <div style={{
                        position:"relative",
                        transition:"transform 0.2s ease-in",
                        transform:getTranform(cardIndex),
                        opacity:getCardOpacity(cardIndex)
                        }}>
                    <CCard
                        card={handDeck.getCard(cardIndex)}
                        isFlipped={flop.getFlip(cardIndex)}
                        onClick={()=>{if(isAcceptable)handleToggle(cardIndex)}}
                    />

                    <button 
                    className="hoverable"
                    style={{ 
                    fontSize:"16px",fontWeight:"bold",border:"black 3px solid",borderRadius:"15px 15px 0px 0px",backgroundColor:"rgb(144, 238, 144)",
                    position:"absolute",left: "50%",transform: "translate(-50%, 0)",marginTop:"-7px",
                    opacity:(cardIndex===toggledCardIndex ?"1":"0"),
                    transition:"height 0.2s ease-in",
                    height:(cardIndex===toggledCardIndex?"30px":"0"),
                    }}
                    onClick={()=>handleAccept(cardIndex)}>ACCEPT</button>
                    </div> }
            </div>
            )}
            {!handDeck && isAcceptable && <button className="hoverable" style={{position:"absolute",height:"auto",alignSelf:"center"}} 
            onClick={onAccept} disabled={!isAcceptable}>PAY ENTRANCE ({enterPrice}$)</button>}
        </div> 
          
           {!isExchange && handDeck && show.cardPreview && <button className="right-centered forth-color" style={{right:"-190px"}} onClick={trySort} disabled={!isAcceptable}>SORT</button>}
           {isExchange && <button className="right-centered forth-color" style={{right:"-190px"}} onClick={tryExchange}>EXCHANGE ({exchangeAttempts})</button>}
       
        </div>);
}

export const CTable = ({initSize,tableDeck,flop,tableHands}) => {
    //tableDeck nullable, ex. [null,card,card,null,null], state
    //flop nullable, ex. [false,true,true,false,false], state
    //tableHands state ex.[{up:card,down:card},...]

    const isNull = (id)=>{ //zalezne tylko od handdeck
        if(!tableDeck || !flop) return null;
        return tableDeck.getCard(id);
    }

    const isTableHand = (index,isup)=>{
        if(!tableHands || tableHands.length<=index) return false;
        return isup ? tableHands[index].up!==null : tableHands[index].down!==null;
    }
    
    return (
        <div className={style.divflex+" "+style.table+" forth-color"}>
            { new Array(initSize).fill(0).map((_,index) =>(
                <div key={index}>
                    {isNull(index) && <CCard mini card={tableDeck.getCard(index)} isFlipped={flop.getFlip(index)} /> }
                    {isTableHand(index,true) && <CCard minimini card={tableHands[index].up} isFlipped={false} />}
                    {isTableHand(index,false) && <CCard minimini card={tableHands[index].down} isFlipped={false} />}
                </div>
            ))}
        </div>
         );
}
