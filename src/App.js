import React from 'react'
import MineWrapper from './component/games/MineWrapper/mineWrapper/MineWrapper'
import Navbar from './component/navbar/Navbar'
import Wallet from './component/wallet/Wallet'
// import ProfitBox from './component/games/MineWrapper/profitbox/ProfitBox'


const App = () => {
  return (
    <div className='App'>
      <Navbar />
      <MineWrapper />
      <Wallet />
      {/* <ProfitBox /> */}
    </div>
  )
}

export default App