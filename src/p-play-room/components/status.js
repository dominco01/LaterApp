import React from "react"

const Status = ({status}) => {
    if(status===null) return <ins><span role="img" aria-label="dot">⚪⚪</span></ins>
    if(status===false) return <ins><span role="img" aria-label="dot">⚪🔴</span></ins>
    return <ins><span role="img" aria-label="dot">🟢⚪</span></ins>
}
 
export default Status;