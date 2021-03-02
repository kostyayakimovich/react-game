import React, { useEffect } from 'react';
import useSound from 'use-sound';
import failure from '../../assets/audio/failure.mp3';
import './styles.css';

export default function GameOver({ volumeSound }) {
  const [playWin, { stop }] = useSound(failure, { volume: volumeSound });
  useEffect(() => {
    playWin();
  }, [playWin]);

  useEffect(() => {
    return () => stop();
  }, [stop]);

  return (
    <div className='gameOverContainer'>
      <div className='gameover'>GAME OVER</div>
    </div>
  );
}
