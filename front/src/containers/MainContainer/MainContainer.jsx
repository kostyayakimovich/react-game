import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import Congratulations from '../../components/Congratulations';
import { resetCardsField, initGame } from '../CardsFieldContainer/cardsActions';
import BackButton from '../../components/BackButton';
import CardsFieldContainer from '../CardsFieldContainer';
import TimerContainer from '../TimerContainer/TimerContainer';
import fullscreen from '../../assets/img/fullscreen.png';
import Volume from '../../components/Volume/Volume';
import GameOver from '../../components/GameOver/GameOver';
import styles from './styles.module.css';
import { setIsEndTimer } from '../Menu/menuActions';
import NewGameButton from '../../components/NewGameButton';
import soundGame from '../../assets/audio/soundGame.mp3';
import soundGame2 from '../../assets/audio/soundGame2.mp3';
import useSound from 'use-sound';

export default function MainContainer() {
  const [volumeMusic, setVolumeMusic] = useState(
    localStorage.getItem('volumeMusic')
      ? localStorage.getItem('volumeMusic')
      : '5'
  );
  const [volumeSound, setVolumeSound] = useState(
    localStorage.getItem('volumeSound')
      ? localStorage.getItem('volumeSound')
      : '5'
  );

  const [isMusic2, setIsMusic2] = useState(
    localStorage.getItem('musicGame') === 'soundGame' ? false : true
  );
  const [musicGame, setMusicGame] = useState(
    localStorage.getItem('musicGame') || 'soundGame'
  );

  const [stateMusic, setStateMusic] = useState(
    localStorage.getItem('stateMusic')
      ? localStorage.getItem('stateMusic')
      : 'play'
  );
  const [stateSound, setStateSound] = useState(
    localStorage.getItem('stateSound')
      ? localStorage.getItem('stateSound')
      : 'play'
  );
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
    localStorage.removeItem('isWinCount');
    localStorage.removeItem('time');
  }, [dispatch]);

  const [playSoundGame, { stop }] = useSound(
    !isMusic2 ? soundGame2 : soundGame,
    {
      volume:
        `${(volumeMusic * 0.1).toFixed(1)}` ||
        `${(localStorage.getItem('volumeMusic') * 0.1).toFixed(1)}`,
    }
  );

  useEffect(() => {
    dispatch(initGame());
  }, [dispatch]);

  const handleKeyPressQ = useCallback(
    (event) => {
      if (event.code === 'KeyQ') {
        handle.enter();
      }
    },
    [handle]
  );

  const handleKeyPressA = useCallback(
    (event) => {
      if (event.code === 'KeyA') {
        if (
          localStorage.getItem('stateMusic') === 'play' ||
          stateMusic === 'play'
        ) {
          localStorage.setItem('stateMusic', 'stop');
          setStateMusic('stop');
          setVolumeMusic('0');
        } else if (
          localStorage.getItem('stateMusic') === 'stop' ||
          stateMusic === 'stop'
        ) {
          localStorage.setItem('stateMusic', 'play');
          setStateMusic('play');
          setVolumeMusic(localStorage.getItem('volumeMusic') || '5');
        }
      }
    },
    [stateMusic]
  );

  const handleKeyPressZ = useCallback(
    (event) => {
      if (event.code === 'KeyZ') {
        if (
          localStorage.getItem('stateSound') === 'play' ||
          stateSound === 'play'
        ) {
          localStorage.setItem('stateSound', 'stop');
          setStateSound('stop');
        } else if (
          localStorage.getItem('stateSound') === 'stop' ||
          stateSound === 'stop'
        ) {
          localStorage.setItem('stateSound', 'play');
          setStateSound('play');
          setVolumeSound(localStorage.getItem('volumeSound') || '5');
        }
      }
    },
    [stateSound]
  );

  const handleKeyPressSpace = useCallback(
    (event) => {
      if (event.code === 'Space') {
        if (
          localStorage.getItem('musicGame') === 'soundGame' ||
          musicGame === 'soundGame'
        ) {
          setMusicGame('soundGame2');
          localStorage.setItem('musicGame', 'soundGame2');
        } else if (
          localStorage.getItem('musicGame') === 'soundGame2' ||
          musicGame === 'soundGame2'
        ) {
          setMusicGame('soundGame');
          localStorage.setItem('musicGame', 'soundGame');
        }
      }
    },
    [musicGame]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPressQ, false);
    return () => {
      document.removeEventListener('keydown', handleKeyPressQ, false);
    };
  }, [handleKeyPressQ]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPressA, false);
    return () => {
      document.removeEventListener('keydown', handleKeyPressA, false);
    };
  }, [handleKeyPressA]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPressZ, false);
    return () => {
      document.removeEventListener('keydown', handleKeyPressZ, false);
    };
  }, [handleKeyPressZ]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPressSpace, false);
    return () => {
      document.removeEventListener('keydown', handleKeyPressSpace, false);
    };
  }, [handleKeyPressSpace]);

  useEffect(() => {
    musicGame === 'soundGame2' ? setIsMusic2(true) : setIsMusic2(false);
  }, [musicGame]);

  useEffect(() => {
    if (stateMusic === 'stop') {
      setVolumeMusic('0');
    } else if (stateMusic === 'play') {
      setVolumeMusic(
        localStorage.getItem('volumeMusic')
          ? localStorage.getItem('volumeMusic')
          : '5'
      );
    }
  }, [stateMusic]);

  useEffect(() => {
    if (stateSound === 'stop') {
      setVolumeSound('0');
    } else if (stateSound === 'play') {
      setVolumeSound(
        localStorage.getItem('volumeSound')
          ? localStorage.getItem('volumeSound')
          : '5'
      );
    }
  }, [stateSound]);

  useEffect(() => {
    return () => stop();
  }, [stop]);

  const [isSave, setIsSave] = useState(false);

  return (
    <>
      <img
        alt='fullscreen'
        src={fullscreen}
        onClick={handle.enter}
        className={styles.imgFullScreen}
      />
      <FullScreen className={styles.fullScreenContainer} handle={handle}>
        {isWin && (
          <Congratulations
            volumeSound={volumeSound}
            isSave={isSave}
            setIsSave={setIsSave}
          />
        )}
        {isEndTimer && <GameOver volumeSound={volumeSound} />}
        {!isWin && !isEndTimer && (
          <CardsFieldContainer
            volumeMusic={volumeMusic}
            volumeSound={volumeSound}
            playSoundGame={playSoundGame}
            stop={stop}
            isMusic2={isMusic2}
            stateMusic={stateMusic}
          />
        )}
        {!isEndGame && <TimerContainer isWin={isWin} isEndTimer={isEndTimer} />}
        {!isSave && !isWin && <BackButton onClick={goBack} />}
        {isSave && <BackButton onClick={goBack} />}
        <Volume
          setVolumeMusic={setVolumeMusic}
          setVolumeSound={setVolumeSound}
          volumeSound={volumeSound}
          volumeMusic={volumeMusic}
          playSoundGame={playSoundGame}
          stop={stop}
        />
        {!isWin && <NewGameButton setIsEndGame={setIsEndGame} />}
      </FullScreen>
    </>
  );
}
