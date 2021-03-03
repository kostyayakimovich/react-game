import React, { useEffect, useCallback } from 'react';
import useSound from 'use-sound';
import win from '../../assets/audio/win.mp3';
import { useSelector } from 'react-redux';
import { useHttp } from '../../hooks/http.hook';
import './styles.css';

export default function Congratulations({ volumeSound, isSave, setIsSave }) {
  const [playWin, { stop }] = useSound(win, { volume: volumeSound });
  useEffect(() => {
    playWin();
  }, [playWin]);

  useEffect(() => {
    return () => stop();
  }, [stop]);

  const { request } = useHttp();
  const resultTime = useSelector((state) => state.timerReducer.resultTime);
  const resultDifficulty = useSelector(
    (state) => state.timerReducer.difficulty
  );
  const player = useSelector((state) => state.playFormReducer.player);
  const getUserResult = useCallback(async () => {
    const resultUserGame = {
      user: `${player.firstName} ${player.lastName}` || 'undefined user',
      difficulty: resultDifficulty,
      result: resultTime,
    };
    try {
      const data = await request('/cong', 'POST', resultUserGame);
    } catch (error) {}
  }, [player, request, resultDifficulty, resultTime]);

  const handleClick = useCallback(() => {
    getUserResult();
    setIsSave(true);
  }, [getUserResult, setIsSave]);

  useEffect(() => {
    return () => setIsSave(false);
  }, [setIsSave]);

  return (
    <div className='congratulationsContainer'>
      <div className='pyro'>
        <div className='before' />
        <div className='after' />
      </div>
      <div className='congratulations'>Congratulations!</div>
      {!isSave && (
        <button type='button' onClick={handleClick} className='btn-back'>
          Save result
        </button>
      )}
    </div>
  );
}
