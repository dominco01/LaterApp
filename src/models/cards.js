export class Card {
    constructor(color,figure) { 
      this.color = color;
      this.figure = figure;
    }

    equal(card){
      return this.color===card.color && this.figure === card.figure;
    }
    isHigher(card){
      return this.figure > card.figure;
    }

    //index: -1-down , 0-equal, 1-up
    deuIndex(card){
      return Math.sign(this.figure-card.figure);
    }

    isCloser(opCard,tableCard)
    {
      let myDelta = Math.abs(this.figure-tableCard.figure);
      let opDelta = Math.abs(opCard.figure-tableCard.figure)
      if(myDelta < opDelta) return true;
      if(myDelta > opDelta) return false;

      return tableCard.getColorOfColor() === this.getColorOfColor();
    }
    
    getColorOfColor() {
      if(this.color==="hearts" || this.color==="diamonds") return "red"
      return "black"
    }
    toString() { return figureToString(this.figure) +" of "+ colorToString(this.color); }
    toStringColor() { return colorToString(this.color); }
    toStringFigure() { return figureToString(this.figure); }
}

//rzutowanie - string
export const Color = {
    hearts:"hearts",
    clubs:"clubs",
    diamonds:"diamonds",
    spades:"spades",
}

//rzutowanie - porownaniowo latwe
export const Figure = {
    2:2,
    3:3,
    4:4,
    5:5,
    6:6,
    7:7,
    8:8,
    9:9,
    10:10,
    J:11,
    Q:12,
    K:13,
    A:14,
}

//local utilities
const figureToString = (fig)=>{
  switch(fig)
  {
      case Figure[2]: return "2";
      case Figure[3]: return "3";
      case Figure[4]: return "4";
      case Figure[5]: return "5";
      case Figure[6]: return "6";
      case Figure[7]: return "7";
      case Figure[8]: return "8";
      case Figure[9]: return "9";
      case Figure[10]: return "10";
      case Figure.J: return "jack";
      case Figure.Q: return "queen";
      case Figure.K: return "king";
      case Figure.A: return "ace";
      default: return "";
  }
}

const colorToString = (col)=>{
  switch(col)
  {
      case Color.hearts: return "Hearts";
      case Color.clubs: return "Clubs";
      case Color.diamonds: return "Diamonds";
      case Color.spades:return "Spades";
      default: return "";
  }
}