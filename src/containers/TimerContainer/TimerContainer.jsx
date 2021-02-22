import React, { useRef, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import Timer from '../../components/Timer';
import {
  clearTime, setTime, setResult,
} from './timerActions';
import { setIsEndTimer } from '../Menu/menuActions';

function TimerContainer({ isWin, isEndTimer,isNewGame, setIsnewGame }) {
  const dispatch = useDispatch();
  const time = useSelector((state) => state.timerReducer.time);
  const timerValue = useSelector((state)=>state.menuReducer.timer);
  const cardsAmount = useSelector((state) => state.menuReducer.gameDifficulty);
  const timerId = useRef(null);

 useEffect(()=>{
  localStorage.setItem('time', JSON.stringify(time));
 },[time])
  
  const startTimer = useCallback(() => {
    timerId.current = setInterval(() => {
      dispatch(setTime());
    }, 1000);
  }, [dispatch]);

  const stopTimer = useCallback(() => {
    clearInterval(timerId.current);
    dispatch(clearTime());
  }, [dispatch]);

  useEffect(() => {
    if (isWin) {
      dispatch(setResult(cardsAmount));
      clearInterval(timerId.current);
    }
  }, [isWin, cardsAmount, dispatch]);

  useEffect(() => {
    if (isEndTimer) {
      clearInterval(timerId.current);
    }
  }, [isEndTimer]);

  useEffect(()=>{     
    return()=>  localStorage.removeItem('time') ;
   },[])

  useEffect(() => {
    if(timerValue==='1'&& time >= 60)
   dispatch(setIsEndTimer(true));
   if(timerValue==='2'&& time >= 120)
   dispatch(setIsEndTimer(true));
  }, [time,timerValue,dispatch]);

  return (
    <Timer time={time} startTimer={startTimer} stopTimer={stopTimer} isNewGame={isNewGame}/>
  );
}

TimerContainer.propTypes = {
  isWin: PropTypes.bool.isRequired,
};

export default React.memo(TimerContainer);