import React, { useCallback, useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import Congratulations from '../../components/Congratulations';
import {
  resetCardsField, initGame,
} from '../CardsFieldContainer/cardsActions';
import BackButton from '../../components/BackButton';
import CardsFieldContainer from '../CardsFieldContainer';
import TimerContainer from '../TimerContainer/TimerContainer';
import fullscreen from '../../assets/img/fullscreen.png';
import Volume from '../../components/Volume/Volume';
import GameOver from '../../components/GameOver/GameOver';
import styles from './styles.module.css';
import { setIsEndTimer } from '../Menu/menuActions';
import NewGameButton from '../../components/NewGameButton';

export default function MainContainer() {
  const[volumeMusic, setVolumeMusic]= useState(
     JSON.parse(localStorage.getItem('volumeMusic'))
     ||0.5);
  const[volumeSound, setVolumeSound]= useState( 
    JSON.parse(localStorage.getItem('volumeSound'))
  ||0.5);
  const [stateMusic, setStateMusic] = useState(
    localStorage.getItem("stateMusic")==="play"?
    localStorage.getItem('stateMusic')
  :"stop");
  const [stateSound, setStateSound] = useState(
    localStorage.getItem("stateSound") ==="play"?
    localStorage.getItem('stateSound')
  :"stop");
const [isEndGame, setIsEndGame] = useState(false);
  const handle = useFullScreenHandle();
  const dispatch = useDispatch();
  const isWin = useSelector((state) => state.cardsReducer.isWin);
  const isEndTimer = useSelector((state) => state.menuReducer.isEndTimer);  
 

  const goBack = useCallback(() => {
    dispatch(resetCardsField());
    dispatch(setIsEndTimer(false));
    localStorage.removeItem('cards');
    localStorage.removeItem('cardsHidden');
    localStorage.removeItem('isWinCount') ;
    localStorage.removeItem('time') ;
  }, [dispatch]);  

  

  useEffect(() => {
    dispatch(initGame());
  }, [dispatch]);


  const handleKeyPress = useCallback(
    (event) => {
    
      if (event.shiftKey && event.code === 'KeyQ') {
        handle.enter();
      }
      if (event.shiftKey && event.code === 'KeyA') {
        if(stateMusic==="play")
        localStorage.setItem('stateMusic',"stop");
        setStateMusic("stop");
      }
      else{
        localStorage.setItem('stateMusic',"play");
        setStateMusic("play");
      }

      if (event.shiftKey && event.code === 'KeyZ') {
        if(stateSound==="play")
        localStorage.setItem('stateSound',"stop");
        setStateSound("stop");
      }
      else{
        localStorage.setItem('stateSound',"play");
        setStateSound("play");
      }
     
    },
    [handle, stateMusic, stateSound]
  );
useEffect(()=>{
document.addEventListener("keydown", handleKeyPress, false);
return ()=>{
  document.removeEventListener("keydown", handleKeyPress, false);
}
},[handleKeyPress])    
  
useEffect(()=>{
  if(stateMusic === "stop"){
    setVolumeMusic(0);  
  }
  else{
    setVolumeMusic(JSON.parse(localStorage.getItem('volumeMusic')))
  }
},[stateMusic])

useEffect(()=>{
  if(stateSound === 'stop'){
    setVolumeSound(0)
  }
  else{
    setVolumeSound(JSON.parse(localStorage.getItem('volumeSound')))
  }
},[stateSound])

 

  return (
    <>
    <img alt = 'fullscreen' src ={fullscreen} onClick={handle.enter}
      className={styles.imgFullScreen}/>    
      <FullScreen className = {styles.fullScreenContainer} handle={handle}>
      {isWin && <Congratulations volumeSound ={volumeSound} />}
      {isEndTimer && <GameOver volumeSound ={volumeSound} />}
         {!isWin&&!isEndTimer&&
          <CardsFieldContainer volumeMusic = {volumeMusic} volumeSound = {volumeSound} />
        }
     {!isEndGame&& <TimerContainer isWin={isWin}
      isEndTimer={isEndTimer}
      />}
     
      <BackButton onClick={goBack} />:<BackButton onClick={goBack} />
      <Volume setVolumeMusic={setVolumeMusic} 
      setVolumeSound ={setVolumeSound}
      volumeSound = {volumeSound}
      volumeMusic = {volumeMusic}
      />
       <NewGameButton setIsEndGame={setIsEndGame}/>
      </FullScreen>
    </>
  );
}