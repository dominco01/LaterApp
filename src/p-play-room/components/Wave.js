import React from "react";
import { MiniCard } from "./CCard";
import './local.css'

//main
const boxHeight = 134; //in px (144-boxPadding)
const cardHeight=50;//in px; boxHeight > cardHeight
const minCardWidth=40//in px; orginalna karta ma 144x100 wiec z proporcji...

//details
const boxPadding = 5;
const cardMargin = 5;//in px

//Wave
const Wave = ({size,code=null}) => {
    //code: [true,false,false,null] - rosnie,maleje,maleje,stoi,maleje
    //code.length+1 === size !!!

    const getCardStyle=(delta=null,index=null)=>{return{
        marginLeft:(index===0?"0px":cardMargin),
        height:cardHeight+"px",
        transform:"translateY("+(-delta*getDeltaSpace())+"px)",
    }}
    const getBoxStyle=()=>{return{
        padding:(boxPadding+"px"),
        height:(boxHeight+"px"), //max height
        width:getBoxWidth()+"px",
    }}

    // [true,false,false,null] => [0,1,0,-1,-1] => - || -
    // [true,true,true,null] => [0,1,2,3,3] => [-2,-1,0,1,1]
    // [false,false,false,false] => [0,-1,-2,-3,-4] => [2,1,0,-1,-2 ]
    const getDeltaArray=()=>{
        let res = new Array(size);
        
        //1=>2
        res[0]=0;
        code.forEach((c,i) => {
            res[i+1]= res[i]+(c===null?0:(c?1:-1))
        });

        //2=>3
        let max = Math.max(...res);
        let min = Math.min(...res);
        let distance = max+Math.abs(min);//max is always positive
        let shift = Math.floor(distance/2);
        if(max>Math.abs(min)) res= res.map(a=>a-shift);
        else res = res.map(a=>a+shift);
        
        return res;
    }

    //local
    const getDeltaSpace=()=>{
        return Math.floor((boxHeight-cardHeight)/(size-1));
    }
    const getBoxWidth=()=>{
        return minCardWidth*size + cardMargin*(size-1)
    }

    const getEmojiSpan=(code)=>{
        if(code===true) return <span role="img" aria-label="up" style={{fontSize:"15px",opacity:"0.5"}}>⬆️</span>
        if(code===false) return <span role="img" aria-label="down"style={{fontSize:"15px",opacity:"0.5"}}>⬇️</span>
        return <span role="img" aria-label="eq"style={{fontSize:"15px",opacity:"0.5"}}>⏸️</span>
    }

    return ( 
    <div className='wave-box forth-color' style={getBoxStyle()}>
        {code && getDeltaArray().map((delta,i)=>(
            <MiniCard key={i} style={getCardStyle(delta,i)} 
            isChildrenRotate={i===0 || code[i-1]===null}>
                {getEmojiSpan(i===0?null:code[i-1])}
            </MiniCard>
        ))}
    </div> );
}

export default Wave;