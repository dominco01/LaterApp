export class Game {
  constructor(id,name,firstPoint,lastPoint,type,firstRoundTime=50,minusRoundTime=10) {
    this.id = id;
    this.name = name;
    this.handDeckSize = 5;//1-10, hand>=table
    this.tableDeckSize = 5;//1-10, hand>=table
    this.points = new Array(this.tableDeckSize).fill(firstPoint);
    this.points[this.tableDeckSize-1]=lastPoint;
    this.type = type;

    let roundsTime = new Array(this.tableDeckSize).fill(firstRoundTime);
    roundsTime = roundsTime.map((a,i)=>a-minusRoundTime*i)
    this.roundsTime= roundsTime;//in seconds, must be odd number

  }
  isWin(pts){return pts>countAllPoints(this.points)/2;}
  isDraw(pts){ return pts===countAllPoints(this.points)/2;}

  getMaxRounds(){return this.tableDeckSize}
  getRoundTime(round=null){
    if(round===null) return this.roundsTime[Math.floor(this.roundsTime.length/2)]
    if(round<0 || round>=this.getMaxRounds()) return this.roundsTime[0]
    return this.roundsTime[round];
  }

  about(){
    switch(this.id){
      case 0: return `Main game mode - click and play!
      If you begginer try to bet money carefully.
      The opponent's cards are visible, so try to predict his move.
      During round, you have enough time to think.`;
      case 1: return`1.4 game mode.
      The last round has so much points, so try to save the best card, "ace up the sleeve"!
      The opponent's cards are visible. Opponent has to be predictable, is't he?`;
      case 2: return`Hidden game mode.
      The opponent cards are hidden, so you have to look only at your cards.
      During round, you have enough time to think.`;
      case 3:return `Fast game mode.
      Hurry up! During round, you have limited time to think. Do you happen to look at the opponent's cards?`;
      default:return;
    }
  }
}

export const GameType = {
  HiddenCards:"HIDDEN",
  OpenCards:"OPEN",
};

const countAllPoints = (points=[])=>{return points.reduce((a, b) => a + b, 0)}