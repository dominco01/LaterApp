
import React from 'react';
import { Random } from '../models/random';

export class Name extends React.Component
{
    //myname name bold

    getName()
    {
        if(this.props.myname) return getMyName();
        else if(this.props.name) return this.props.name
        else return Random.getRandomName(true)
    }

    render()
    { 
        return (
            <ins style={{"fontWeight":(this.props.bold?"bold":"none")}}>
                {this.getName()}
            </ins>
        );
    }
}


//local

const getMyName= ()=> {
    let name = localStorage.getItem("name");
    if(!name) 
    {
        name = Random.getRandomName(false);
    }

    return name;
}
