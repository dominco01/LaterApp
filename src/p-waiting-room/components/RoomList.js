import React  from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { AccountContext } from '../../context/AccountContext';
import { Name } from '../../components/Name';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { Random } from '../../models/random';
import './local.css';

const RoomList = ({gameId}) => {

    const {getBalance} = useContext(AccountContext);//use myBalance instead
    const balance = getBalance();

    const maxRangePrice = toRangePriceFloor(balance);
    const [myRangePrice,setMyRangePrice]= useState(toRangePriceFloor(Math.floor(balance/10)))
    const [myColor,setMyColor]=useState("black");
    const [list,setList]=useState(initList(maxRangePrice))

    useEffect(()=>{
        const interval = setInterval(()=>{
            setList(changeList(list,maxRangePrice))
        },Random.getRandomRangeIn(5,10)*1000)//1-5s
        return ()=>clearInterval(interval)
    },[])
    
    
    return (
        <div className='roomlistbox forth-color' >
            <div className='header'>
                <div>ROOMS</div>
                <div style={{whiteSpace:"nowrap"}}>1$ - {maxRangePrice}$</div>
                <div style={{opacity:"0"}}>ROO</div>
            </div>

            <div className='list'>
                {list.map((item,i)=>(
                <div className='item' key={i}>
                    <Name name={item.name}/>
                    <div >{item.color.toUpperCase()}</div> {/*<span role="img"aria-label="color">♥️♦️♠️♣️</span>*/}
                    <div>{item.price}$</div>
                    <Link to={{ pathname: ("/"+["game",gameId,item.color==="black"?"red":"black",item.name,item.price].join("/"))}}>
                        <button> JOIN </button>
                    </Link>
                </div>
                ))}
            </div>

            <div className='item'>
                <Name myname/>
                <div className='hoverable' onClick={()=>{setMyColor(myColor==="black"?"red":"black")}} style={{textDecoration:"underline"}}>{myColor.toUpperCase()}</div>
                <div>{myRangePrice}$</div>
                <input type="range" min="0" max={getRangePriceIndex(maxRangePrice)} 
                    value={getRangePriceIndex(myRangePrice)}
                    onChange={event=>setMyRangePrice(getRangePrice(event.target.value))}>
                </input>
                <button disabled>CREATE</button>
            </div>
        </div>);
}
 
export default RoomList;

//local

const initList=(maxRangePrice)=>{
    let res=[];

    let initLength = getInitLength(maxRangePrice);
    let maxIndex = getRangePriceIndex(maxRangePrice);
    for(let i =0;i<initLength;i++)
    {
        res.push(new ListItem(Random.getRandomName(),Random.getRandomColorOfColor(),getRangePrice(Random.getRandomIn(maxIndex))))
    }

    res.sort(function(a,b){  return b.price- a.price;  });
    return res;
}

const changeList=(list,maxRangePrice)=>{
    let res=[...list];

    let toDelete = getDeleteLength(maxRangePrice);
    
    for(let i =0;i<toDelete;i++)
    {
        if(res.length<=0)break;
        res.splice(Math.floor(Math.random()*res.length), 1);
    }

    let toAdd = getAddLength(maxRangePrice);
    let maxIndex = getRangePriceIndex(maxRangePrice);
    for(let i =0;i<toAdd;i++)
    {
        res.push(new ListItem(Random.getRandomName(),Random.getRandomColorOfColor(),getRangePrice(Random.getRandomIn(maxIndex))))
    }

    res.sort(function(a,b){  return b.price- a.price;  });
    return res;
}

class ListItem{
    constructor(name,color,price)
    {
        this.name = name;
        this.color = color;
        this.price = price;
    }
}


//range price = [1,2,4,8,10,20,40,80,...]

const toRangePriceFloor=(price)=>{
    if(price<1) return 1
    let base = Math.pow(10, Math.floor(Math.log10(price)))
    while(base*2<price) base*=2;
    return base
}

const getRangePriceIndex=(maxPrice)=>{
    let index=0;
    while(getRangePrice(index)<=maxPrice)index++;
    return index-1;
}

const getRangePrice=(index)=>{
    return Math.pow(2,index%4) * Math.pow(10,Math.floor(index/4))
}

//local of local
const getInitLength=(maxRangePrice)=>{// maxRangePrice = 100 => 8 => 15
    let i = getRangePriceIndex(maxRangePrice);
    let s = Math.ceil(Math.sqrt(i))*5;
    return 1+Random.getRandom(s)
}

const getAddLength=(maxRangePrice)=>{// maxRangePrice = 100 => 8 => 2
    let i = getRangePriceIndex(maxRangePrice);
    let s = Math.ceil(Math.sqrt(i));
    return Random.getRandom(s)
}

const getDeleteLength=(maxRangePrice)=>{// maxRangePrice = 100 => 8 => 2
    let i = getRangePriceIndex(maxRangePrice);
    let s = Math.ceil(Math.sqrt(i));
    return Random.getRandom(s)
}
