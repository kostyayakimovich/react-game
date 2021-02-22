import React,{useCallback} from 'react';
import {useDispatch } from 'react-redux';
import { initGame, resetCardsField } from '../../containers/CardsFieldContainer/cardsActions';
import { clearTime } from '../../containers/TimerContainer/timerActions';
import { setIsEndTimer } from '../../containers/Menu/menuActions';
import styles from './styles.module.css';

export default function NewGameButton({ setIsEndGame}) {
    const dispatch = useDispatch();
    const newGame = useCallback(() => {
      localStorage.removeItem('cards');
      localStorage.removeItem('cardsHidden');
      localStorage.removeItem('isWinCount') ;
      localStorage.removeItem('time') ;
        dispatch(clearTime());
        dispatch(setIsEndTimer(false));
        dispatch(resetCardsField());
        dispatch(initGame());      
        setIsEndGame(false);
      }, [dispatch,  setIsEndGame]);

  return (
    
      <button type="button" className={styles.button}  onClick={newGame}>
        New game
      </button>

  );
}