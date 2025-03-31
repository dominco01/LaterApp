import React, { useState } from 'react'

export const DarkModeContext = React.createContext();

const DarkModeProvider = ({children})=>
{
    var [isDarkMode,setIsDarkMode] = useState(true);

    return(
        <DarkModeContext.Provider value={{isDarkMode:isDarkMode,switchDarkMode:()=>setIsDarkMode(!isDarkMode)}}>
            {children}
        </DarkModeContext.Provider>
    )
}

export default DarkModeProvider;