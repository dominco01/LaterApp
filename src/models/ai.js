export class AI
{

    //min-max algorythm
    //nie mysli o pozniejszych fazach (later round)
    //opponent mysli 1rundowo
    static getIndex(handDeck, opHandDeck,tableDeck,round)//min round = 1
    {
        let currTableCard = tableDeck.getCard(round-1);
        let [deuCombo,deuIndex] = getDeu(tableDeck,round)
        
        //TODO:
        handDeck.forEach((card,i) => {
        if(card)
        {
            let opwin = false;
            opHandDeck.forEach(opcard => {    
            if(opcard)
            {
                if(opcard.isCloser(card,currTableCard))opwin=true;
            }
            });

            if(opwin)return;//TODO
        }
        });
    }
}

//DEU = DOWN EQUAL UP //index: -1-down , 0-equal, 1-up
const getDeu=(tableDeck,round)=>{
    let deuIndex = -1;
    let deuCombo = 0;

    for(let i=round;i<tableDeck.getSize();i++)
    {
        let currDeu = tableDeck.getCard(i).deuIndex(tableDeck.getCard(i-1));
        if(deuIndex===-1) deuIndex = currDeu;
        else if(deuIndex!==currDeu) break;
        deuCombo++;
    }

    return [deuCombo,deuIndex]
}