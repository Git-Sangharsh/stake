import React from 'react'
import MineWrapper from './component/games/MineWrapper/MineWrapper'
import Navbar from './component/navbar/Navbar'
import Wallet from './component/wallet/Wallet'


const App = () => {
  return (
    <div className='App'>
      <Navbar />
      <MineWrapper />
      <Wallet />
    </div>
  )
}

export default App