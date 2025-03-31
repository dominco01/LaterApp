import { customNames } from "./consts";

export class Random{

    //return number between 0 - (range-1)
    static getRandom(range){
        return Math.floor(Math.random()*range);
    }

    static getRandomIn(range){
        return Math.floor(Math.random()*(range+1));
    }

    static getRandomRange(min,max){
        return min+this.getRandom(max);
    }

    static getRandomRangeIn(min,max){
        return min+this.getRandom(max+1);
    }

    static getRandomName(includeCustom=true)
    {
        if(includeCustom && this.getRandom(3)!==1) return customNames[this.getRandom(customNames.length)];
        return "Player"+this.getRandom(1000);
    }

    static getRandomColorOfColor()
    {
        return this.getRandom(2)===0?"black":"red"
    }

}

