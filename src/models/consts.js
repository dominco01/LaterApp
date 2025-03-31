import { Game, GameType } from "./game";

export const GameSet = {
    games:[
      new Game(0,"PLAY",1,3,GameType.OpenCards),
      new Game(1,"1.4",1,4,GameType.OpenCards),
      new Game(2,"HIDDEN",1,3,GameType.HiddenCards,),
      new Game(3,"FAST",1,3,GameType.OpenCards,10,0),
    ],
    getGame:(id)=>GameSet.games[id],
    getMainGame:()=>GameSet.getGame(0),
    getOtherGames:()=>GameSet.games.filter(game=>game.id!==0),
}

export const codes={
    0:"imnew",
    1:"name5",
    2:"greenwin",
    3:"herewegoagain",
    4:"likeaboss",
    5:"fam50",
    6:"friends",
    7:"rules",
    //7:"777" //if player win 7 times
}

export const codesValue={
    "imnew":10,
    "name5":5,
    "greenwin":10,
    "herewegoagain":10,
    "likeaboss":7,
    "fam50":50,
    "friends":50,
    "rules":10,
}

export const noToUseCodes=[5,6,7]

export const customNames=[
    "Lara Croft",
    "ElChapo",
    "Airport Hobo",
    "Minecraft Steve",
    "HarrietThugman",
    "Pinball Tables",
    "Flack",
    "Red Rhino",
    "not_james_bond",
    "bread_pitt",
    "Norma Scock",
    "well_endowed",
    "averagestudent",
    "avo_cuddle",
    "Joyful",
    "chuck_norris",
    "abductedbyaliens",
    "Adobo_Ahai",
    "Not-Insync",
    "heisenberg_blue",
    "PaniniHead",
    "no_one_cares",
    "pixie_dust",
    "manic_pi",
    "look_mom",
    "botaccount",
    "QuarQueen",
    "Reese_With",
    "ReeseWithafork",
    "ImageNotUploaded",
    "No_Feet_Pics",
    "wheretomatoes",
    "TequilaBird",
    "the_other",
    "not you",
    "PaintMeLike",
    "Hot_Name_Here",
    "BasicBeach",
    "thot_patrol",
    "my_anaconda_does",
    "kim_chi",
    "username_copied",
    "Ariana_Grande",
    "defasff"]