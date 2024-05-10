import React, { useEffect } from 'react'
import "./DiceWrapper.css"
import DiceBet from "../DiceBet/DiceBet.js"
import Dice from '../dice/Dice.js';
import { useLocation } from 'react-router-dom';

const DiceWrapper = () => {

  const location = useLocation();

  useEffect(() => {
    if(location.pathname === '/casino/dice'){
      document.body.style.overflow = "hidden";
    }else{
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    }
  }, [location.pathname])
  return (
    <div className='diceWrapper'>
        <DiceBet />
        <Dice />
    </div>
  )
}

export default DiceWrapper