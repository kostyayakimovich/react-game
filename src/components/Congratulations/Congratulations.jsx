import React, { useEffect } from 'react';
import useSound from 'use-sound';
import win from '../../assets/audio/win.mp3';
import './styles.css';

export default function Congratulations({volumeSound}) {
  const [playWin,{stop}] = useSound(win,  { volume: volumeSound });
  useEffect(()=>{
    playWin();  
  },[playWin])

  useEffect(()=>{    
    return () =>stop();   
 },[stop])

  return (
    <div className="congratulationsContainer">
      <div className="pyro">
        <div className="before" />
        <div className="after" />
      </div>
      <div className="congratulations">Congratulations!</div>
    </div>
  );
}