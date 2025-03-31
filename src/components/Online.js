import React, { useContext}  from 'react';
import { OnlineContext } from '../context/OnlineContext';

const Online = () => {

    const {totalPlayers} = useContext(OnlineContext);

    return (<div className="online-id" >ONLINE: {totalPlayers}</div>);
}
export default Online;

