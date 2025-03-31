export class Flop //ex. [true,false,true,true,false]
{
  constructor(size,flop)//tego nie uzywamy
  {
    this.flips = !flop ? new Array(size).fill(true) : flop.getFlips();
  }

  static New(size){
    return new Flop(size,null);
  }

  static Copy(flop){
    return new Flop(null,flop);
  }

  getFlips(){return this.flips;}
  getFlip(index){return this.flips[index]}
  isShowAll(){
    let res = true;
    this.flips.forEach(flip => { if(flip)res=false; });
    return res;
  }
  show(index){this.flips[index]=false;return this;}
  showOnly(index)
  {
    for(let i =0;i<this.flips.length;i++)
    {
      if(i===index) this.flips[i]=false;
      else this.flips[i]=true;
    }
    return this;
  }
  showAll(){this.flips =new Array(this.flips.length).fill(false);return this}
  showNext(){
    
    let id = 0;
    while(this.flips[id]===false && this.flips.length!==id)id++;
    if(this.flips.length!==id) this.flips[id]=false;
    
    return this;
  }
}
