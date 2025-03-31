
import React from 'react';
import { Color, Figure } from '../../models/cards';

export const CCard = ({card,isFlipped,onClick}) => {
    
    return ( 
        <div className={'flip-card scale-hoverable'} onClick={onClick} style={{transform: (isFlipped? "rotateY(180deg)":"")}} >
            
            <div className={'flip-card-front'}>
                <img 
                src={getPath(card,false)} 
                alt={card.toString()}></img>
            </div>
           
            <div className='flip-card-back'>
                <img
                src={getPath(card,true)} 
                alt={"Flipped card"}></img>
            </div>
            
        </div>
        );
}

export const MiniCard = ({style,isChildrenRotate,children}) => {
    const {height,...globalStyle} = style;
    const getTransfrom=(isRotate)=>{
        if(isRotate)return "translate(-50%,-65%) rotate(90deg)"
        return "translate(-50%,-65%)"
    }
    return (
        <div className='scale-hoverable relative' style={globalStyle} >
            <img style={{height,opacity:"0.8"}} src={getPath()} alt={"Mini card"}></img>
            <div className='centered blackAndWhite' style={{fontWeight:"bold",fontSize:"20px",transform:getTransfrom(isChildrenRotate)}}>{children}</div>
        </div>)
}
// local

//niewykorzystywany "?" na odwrocie ... moze kiedys. (flip-q)
const prepath = "/asset-cards-cute" //row: 1-trefl , 2-karo , 3-pik , 4-kier
const getPath = (card=null,isFlipped=null)=>
{
    if(card===null) return process.env.PUBLIC_URL + [prepath,"flip-empty"].join("/")+".png";
    if(isFlipped) return process.env.PUBLIC_URL + [prepath,"flip-"+card.getColorOfColor()].join("/")+".png";
    
    return process.env.PUBLIC_URL + [prepath,["row",colorToRowNumber(card.color),"column",figureToColumnNumber(card.figure)].join("-")].join("/")+".png";
}

//local of local
const colorToRowNumber =(color)=>
{
    switch(color)
    {
        case Color.hearts: return 4;
        case Color.clubs: return 1;
        case Color.diamonds: return 2;
        case Color.spades:return 3;
        default: return 1;
    }
}
const figureToColumnNumber = (fig)=>{
    return ((fig-1) % (Object.keys(Figure).length))+1
}

/*
const prepath = "/asset-cards-basic"
const getPath = (card,isFlipped)=>{
    if(isFlipped) return [prepath,"flipped",card.toStringFlipSign()].join("/")+".png";
    return [prepath,[card.toStringFigure(),"of",card.toStringColor()].join("_")].join("/")+".png";
}

//const test = "/asset-cards-bnw/flip-black/Flipped_black.png"

const getPath = (card,isDarkMode,isFlipped)=>{
    let mode = isDarkMode?"black":"white"
    if(isFlipped) return [prepath,"flip-"+mode,[card.toStringFlipSign(),mode].join("_")].join("/")+".png";
    return [prepath,mode,[card.toStringColor(),card.toStringFigure(),mode].join("_")].join("/")+".png";
}
*/