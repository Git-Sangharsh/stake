import React from 'react'
import Mine from './mines/Mine'
import Bet from './bet/Bet'
import './Minewrapper.css';

const MineWrapper = () => {
  return (
    <div className='mine-wrapper'>
        <Bet />
        <Mine />
    </div>
  )
}

export default MineWrapper