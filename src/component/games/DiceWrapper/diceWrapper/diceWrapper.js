import React from 'react'
import "./DiceWrapper.css"
import DiceBet from "../DiceBet/DiceBet.js"
import Dice from '../dice/Dice.js';

const DiceWrapper = () => {
  return (
    <div className='diceWrapper'>
        <DiceBet />
        <Dice />
    </div>
  )
}

export default DiceWrapper