import React,{useCallback} from 'react';
import {useDispatch } from 'react-redux';
import { initGame } from '../../containers/CardsFieldContainer/cardsActions';
import { clearTime } from '../../containers/TimerContainer/timerActions';
import styles from './styles.module.css';

export default function NewGameButton() {
    const dispatch = useDispatch();
    const newGame = useCallback(() => {
        dispatch(clearTime());
        dispatch(initGame());
      }, [dispatch]);

  return (
    
      <button type="button" className={styles.button}  onClick={newGame}>
        New game
      </button>

  );
}