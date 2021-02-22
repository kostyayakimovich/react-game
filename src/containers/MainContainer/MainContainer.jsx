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
  const[volumeMusic, setVolumeMusic]= useState( JSON.parse(localStorage.getItem('volumeMusic'))||0.5);
  const[volumeSound, setVolumeSound]= useState( JSON.parse(localStorage.getItem('volumeSound'))||0.5);
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
     
      <BackButton onClick={goBack} />
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