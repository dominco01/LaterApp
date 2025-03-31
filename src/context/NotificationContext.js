import React, { useState } from 'react'
import { useContext } from 'react';
import { DialogContext } from './DialogContext';

export const NotificationContext = React.createContext();

//notification center, gaining notifications (notification state)
const NotificationProvider = ({children})=>
{
    const {setTextDialog} = useContext(DialogContext);

    const [notification,setNotification] = useState(null);

    const handleSetNotification = (title,text,bold=null)=>{
        setNotification({title:title,text:text,bold:bold});
    }

    const handleShowNotification = ()=>{
        setTextDialog(notification.title,notification.text,notification.bold)
        setNotification(null)
    }

    const value ={
        isNotification:notification!==null,
        setNotification:handleSetNotification,
        showNotification:handleShowNotification,
    }

    return(
        <NotificationContext.Provider value={value}>
            {children}
        </NotificationContext.Provider>
    )
}

export default NotificationProvider;