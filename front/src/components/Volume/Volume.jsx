import React, { useCallback, useState, useEffect } from 'react';
import melody from '../../assets/img/sound_icon/melody.png';
import pause from '../../assets/img/sound_icon/pause.png';
import mute from '../../assets/img/sound_icon/mute.png';
import sound from '../../assets/img/sound_icon/sound.png';
import styles from './styles.module.css';

export default function Volume({
  setVolumeMusic,
  setVolumeSound,
  volumeSound,
  volumeMusic,
  playSoundGame,
  stop,
}) {
  const [powerMelody, setPowerMelody] = useState('5');
  const [powerSound, setPowerSound] = useState('5');

  const handleVolumeMusic = useCallback(
    (e) => {
      setVolumeMusic(e.target.value);
      localStorage.setItem('volumeMusic', `${e.target.value}`);
    },
    [setVolumeMusic]
  );
  const handleVolumeSound = useCallback(
    (e) => {
      setVolumeSound(e.target.value);
      localStorage.setItem('volumeSound', `${e.target.value}`);
    },
    [setVolumeSound]
  );
  const handleClickMelody = useCallback(() => {
    setPowerMelody(volumeMusic);
    setVolumeMusic('0');
  }, [volumeMusic, setVolumeMusic]);
  const handleClickSound = useCallback(() => {
    setPowerSound(volumeSound);
    setVolumeSound('0');
  }, [volumeSound, setVolumeSound]);
  const handleClickPause = useCallback(() => {
    setVolumeMusic(powerMelody);
    playSoundGame();
  }, [setVolumeMusic, powerMelody, playSoundGame]);
  const handleClickMute = useCallback(() => {
    setVolumeSound(powerSound);
  }, [setVolumeSound, powerSound]);

  useEffect(() => {
    return () => stop();
  }, [stop]);

  return (
    <div className={styles.volume}>
      <div className={styles.rangeWrapper}>
        {volumeMusic < 1 ? (
          <img
            onClick={handleClickPause}
            className={styles.iconVolume}
            alt='volumeMusic'
            src={pause}
          />
        ) : (
          <img
            onClick={handleClickMelody}
            className={styles.iconVolume}
            alt='volumeMusic'
            src={melody}
          />
        )}
        <input
          onChange={handleVolumeMusic}
          type='range'
          min='0'
          step='1'
          max='10'
          value={volumeMusic}
          className={styles.range}
          id='rangeM'
        />
      </div>
      <div className={styles.rangeWrapper}>
        {volumeSound < 1 ? (
          <img
            onClick={handleClickMute}
            className={styles.iconVolume}
            alt='volumeSound'
            src={mute}
          />
        ) : (
          <img
            onClick={handleClickSound}
            className={styles.iconVolume}
            alt='volumeSound'
            src={sound}
          />
        )}
        <input
          onChange={handleVolumeSound}
          type='range'
          min='0'
          step='1'
          max='10'
          value={volumeSound}
          className={styles.range}
          id='rangeS'
        />
      </div>
    </div>
  );
}
