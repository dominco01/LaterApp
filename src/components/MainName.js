import React from 'react';
import { CodeContext } from '../context/CodeContext';
import { DialogContext } from '../context/DialogContext';
import { Random } from '../models/random';

class MainName extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {name: ""};
    }

    componentDidMount()
    {
        this.setState({name:getMyName()})
    }

    handleOnClick = ()=>{
        this.context.setInputDialog("Change your name",(name)=>{if(name && name!=="")this.setMyName(name)});
    }

    setMyName = (name)=> {
        if(!localStorage.getItem("name"))
            this.props.codeContext.saveCode(1,"Congrats you set your name!")
            
        localStorage.setItem("name",name);
        this.setState({name:name})
    }

    render()
    { 
        return (
            <ins className='underline hoverable' onClick={this.handleOnClick} >{this.state.name}</ins>
        );
    }
    

}
MainName.contextType = DialogContext;

export const withCodeContext = Component => (
    props => (
      <CodeContext.Consumer>
        {context => <Component codeContext={context} {...props} />}
      </CodeContext.Consumer>
    )
  )

export default withCodeContext(MainName);

//local

const getMyName= ()=> {
    let name = localStorage.getItem("name");
    if(!name) 
    {
        name = Random.getRandomName(false);
    }

    return name;
}
