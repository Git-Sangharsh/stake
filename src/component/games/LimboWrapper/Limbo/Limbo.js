import React, { useState, useEffect } from 'react';
import './Limbo.css';
import { useSelector } from 'react-redux';

const Limbo = () => {
    const betActive = useSelector((state) => state.betActive);
    const [randomNum, setRandomNum] = useState(null);
    const [displayedNum, setDisplayedNum] = useState(1.00);

    const generateRandomNumber = () => {
        setDisplayedNum(1.00);

        let rangeSelector = Math.random();

        // Define ranges and their corresponding probabilities
        const ranges = [
            { range: [1.00, 1.99], probability: 90.00 },
            { range: [2.00, 100], probability: 10.00 }
        ];

        let selectedRange;
        for (const range of ranges) {
            if (rangeSelector < range.probability / 100) {
                selectedRange = range;
                break;
            }
            rangeSelector -= range.probability / 100;
        }

        let newRandomNum;
        if (selectedRange.range[0] === 1.00 && selectedRange.range[1] === 1.99) {
            newRandomNum = Math.floor(Math.random() * 100) / 100 + 1;
        } else {
            newRandomNum = Math.random() * (selectedRange.range[1] - selectedRange.range[0]) + selectedRange.range[0];
        }

        newRandomNum = parseFloat(newRandomNum.toFixed(2));

        setRandomNum(newRandomNum);
    };

    useEffect(() => {
        if (betActive) {
            generateRandomNumber(); 
        }
    }, [betActive]);

    useEffect(() => {
        if (randomNum !== null) {
            const incrementInterval = setInterval(() => {
                setDisplayedNum(prevNum => {
                    const step = 0.01;
                    const diff = randomNum - prevNum;
                    if (diff <= step) {
                        clearInterval(incrementInterval);
                        return randomNum;
                    } else {
                        return prevNum + step;
                    }
                });
            }, 10);

            return () => clearInterval(incrementInterval);
        }
    }, [randomNum]);

    return (
        <div className="limbo">
            <h1 className="limbo-number-header">{displayedNum.toFixed(2)}x</h1>
            {/* <button onClick={generateRandomNumber}>Generate Random Number</button> */}
            <div className="target-multiplier">
                <input type="text" className='target-multiplier-input'/>
            </div>
        </div>
    );
};

export default Limbo;
