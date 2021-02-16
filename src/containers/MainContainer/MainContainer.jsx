import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import Congratulations from '../../components/Congratulations';
import {
  resetCardsField, initGame,
} from '../CardsFieldContainer/cardsActions';
import BackButton from '../../components/BackButton';
import CardsFieldContainer from '../CardsFieldContainer';
import TimerContainer from '../TimerContainer/TimerContainer';
import fullscreen from '../../assets/img/fullscreen.png'
import styles from './styles.module.css';

export default function MainContainer() {
  const handle = useFullScreenHandle();
  const dispatch = useDispatch();
  const isWin = useSelector((state) => state.cardsReducer.isWin);

  const goBack = useCallback(() => {
    dispatch(resetCardsField());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initGame());
  }, [dispatch]);

  return (
    <>
    <img alt = 'fullscreen' src ={fullscreen} onClick={handle.enter}  className={styles.imgFullScreen}/>
    
      <FullScreen className = {styles.fullScreenContainer} handle={handle}>
      {isWin ? <Congratulations />
        : (
          <CardsFieldContainer />
        )}
      <TimerContainer isWin={isWin} />
     
      <BackButton onClick={goBack} />
      </FullScreen>
    </>
  );
}