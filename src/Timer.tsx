import React from 'react';
import { useState,useEffect } from 'react';

const Timer = () => {
    const [start, setStart] = useState(0);
    const [startdate, setStartdate] = useState(0);

  const [countdown, setSeconds] = useState(0);
  
  const getTime = () => {
    const time =   Date.now()- startdate;
    setSeconds(Math.floor((time / 1000) % 60));
  };
  const startCountdown = () => {
    setStart(1);
    setSeconds(0);
    setStartdate(Date.now());
       
  };
  const resetCountdown = () => {
    // const time = Date.parse(startdate) - Date.now();    
    setSeconds(0);
    setStart(0);
  };
  
  

  useEffect(() => {
    if(start){ 
        console.log("useeffect")
        const interval = setInterval(() => getTime(), 1000);
        return () => clearInterval(interval);      
    }
    else 
    return 
   
  });

  return (
    <div className="timer">
       Current-: {countdown}
       <button onClick={startCountdown}>start</button>
       <button onClick={resetCountdown}>reset</button>
    </div>
  );
};

export default Timer;