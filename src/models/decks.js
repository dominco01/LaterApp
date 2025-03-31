import { Card, Color, Figure } from "./cards";

export class HandDeck //ex. [card, card, null, null, card]
{
  constructor(size,color,handDeck)//tego nie uzywamy
  {
    this.cards = !handDeck ? getRandomHandCards(size,color) : handDeck.getCards();
  }

  static New(size,color){
    return new HandDeck(size,color,null);
  }

  static Copy(handdeck){
    return new HandDeck(null,null,handdeck);
  }

  //cards
  getCard(id){return this.cards[id];}
  getCards(){return this.cards;}
  isCard(card){return this.cards.filter(a=>a.equal(card)).length !== 0}
  takeOffCardByIndex(index){
    this.cards[index]= null;
    return this;
  }
  getLength(){return this.getCards().filter(a=>a!==null).length}
  getSize(){return this.cards.length;}
  
  //
  getRandomIndex(){
    //random number
    let len=this.getLength();
    if(len===0){console.log("wrong use");return -1;}

    let rand = getRandom(len);

    for(let index =0;index<this.getSize();index++)
    {
      if(this.cards[index]!==null) 
      {
        if(rand===0) return index;
        rand--;
      }
    }
    console.log("wrong use");
    return -1;
  }
}

export class TableDeck
{
  constructor(size,handDeck1,handDeck2,tableDeck)
  {
    this.cards = !tableDeck ? getRandomTableCards(size,handDeck1,handDeck2) : this.cards = tableDeck.toArray();
  }

  static New(size,handDeck1,handDeck2){
    return new TableDeck(size,handDeck1,handDeck2,null);
  }

  static Copy(tableDeck){
    return new TableDeck(null,null,null,tableDeck);
  }

  getCard(id){return this.cards[id];}
  getCards(){return this.cards;}
  getSize(){return this.cards.length;}
  
  getWaveCode()
  {
    let res = new Array(this.cards.length-1);
    
    let prevFigure=null;
    this.cards.forEach((card,i) => {
      if(prevFigure!==null) 
      {
        if(card.figure===prevFigure) res[i-1]=null;
        else res[i-1] = card.figure-prevFigure>0;
      }
      prevFigure=card.figure;
    });

    return res;
  }
}

//local
var getRandomHandCards = function(size,color)
{
  if(size>= Figure.length * Color.length) {console.log("size too high");return [];}

  let res = [];
  while(res.length !== size)
  {
    let temp = new Card(getRandomColor(color),getRandomFigure());
    if(res.filter((card)=>card.equal(temp)).length===0) res.push(temp);
  }
  return res;
}

var getRandomTableCards = function(size,handDeck1,handDeck2)
{
  if(size>= Figure.length * Color.length) {console.log("size too high");return [];}

  let res = [];
  while(res.length !== size)
  {
    let temp = new Card(getRandomColor(),getRandomFigure());
    if(res.filter((card)=>card.equal(temp)).length===0 && !handDeck1.isCard(temp) && !handDeck2.isCard(temp)) 
    {
      res.push(temp);
    }
  }
  return res;
}

const getRandom =(range)=>{//return number between 0 - (range-1)
  return Math.floor(Math.random()*range);
}

//local of local

var getRandomFigure = function () {
  var keys = Object.keys(Figure);
  return Figure[keys[ keys.length * Math.random() << 0]];
};

var getRandomColor = function (color=null) {//red or black colors
  if(color ) return (Math.floor(Math.random()*2)===0)? (color==="red"?"hearts":"clubs"):(color==="red"?"diamonds":"spades")
  
  var keys = Object.keys(Color).filter(key=>color? Color[key]===color:true);
  let a = Color[keys[ keys.length * Math.random() << 0]];
  return a;
};


/* OLD CLASS DECK - maybe willlll be usefull

export class Deck {
    constructor(redDeck,blackDeck) {//custom initialize deck | Deck = FullDeck - deck1 - deck2
      this.cards = [];

      let card;
      for (const color of Object.keys(Color))
      {
        if(color === "Red")
        {
          for (const figure of Object.keys(Figure)) 
          {
            card=new Card(color,figure);
            if(!redDeck.includes(card)) this.cards.push(card);
          }
        }
        else
        {
          for (const figure of Object.keys(Figure)) 
          {
            card=new Card(color,figure);
            if(!blackDeck.includes(card)) this.cards.push(card);
          }
        }
      }
      shuffleArray(this.cards);
    }

    getOneCard()
    {
      return this.cards.pop();
    }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}
*/