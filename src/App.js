import React, { useContext } from 'react';
import Home from './p-home/Home';
import CGame from './p-play-room/CGame';
import {HashRouter as Router,Route,Routes} from 'react-router-dom'
import Account  from './components/Account';
import WaitingRoom from './p-waiting-room/WaitingRoom';
import Online from './components/Online'
import OnlineProvider from './context/OnlineContext';
import NotificationProvider from './context/NotificationContext';
import AccountProvider from './context/AccountContext';
import DialogProvider from './context/DialogContext';
import { DarkModeContext } from './context/DarkModeContext';
import CodeProvider from './context/CodeContext';
import { useState } from 'react';

function App() {

  const {isDarkMode} = useContext(DarkModeContext);

  const [navBarGold,setNavBarGold] = useState(null);//true-gold,false-red,null-default

  const getNavBarClass =()=>{
    if(navBarGold===null) return "primary-color";
    return navBarGold?"goldish-bg":"redish-bg"
  }

  return (
    
      <div className={"App " +(isDarkMode?"secondary-color":"third-color")} >
      
      <DialogProvider>
      <NotificationProvider>
      <AccountProvider>
      <CodeProvider>
          <div className={'navbar '+getNavBarClass()}>
            <div className='darker-color'><b>LATER <span role="img" aria-label="dot">🎴</span></b> the gambling game</div>
            <div><Account onCharging={(val)=>{setNavBarGold(val)}}></Account></div>
          </div>

        <div className='content'>
          <OnlineProvider>
                <Router>
                  <Routes>
                    <Route exact path='/' element={<Home/>} />
                    <Route exact path='/waiting-room/:id' element={<WaitingRoom/>} />
                    <Route exact path='/game/:id/:myColor/:opName/:enterPrice' element={<CGame/>} />
                  </Routes>
                </Router>
              
              <Online/>
          </OnlineProvider>
          </div>
      </CodeProvider>
      </AccountProvider>
      </NotificationProvider>
      </DialogProvider>
      
      </div>
  );
}

export default App;
