import React,{useCallback, useState} from 'react';
import melody from '../../assets/img/sound_icon/melody.png';
import pause from '../../assets/img/sound_icon/pause.png';
import mute from '../../assets/img/sound_icon/mute.png';
import sound from '../../assets/img/sound_icon/sound.png';
import styles from './styles.module.css';

export default function Volume({setVolumeMusic,setVolumeSound, volumeSound, volumeMusic}) {
    const [powerMelody, setPowerMelody] = useState(0);
    const [powerSound, setPowerSound] = useState(0);

    const handleVolumeMusic = useCallback(e=>{
      setVolumeMusic(e.target.value);
      localStorage.setItem('volumeMusic', JSON.stringify(e.target.value));
    },[setVolumeMusic]);
    const handleVolumeSound = useCallback(e=>{
      setVolumeSound(e.target.value);
      localStorage.setItem('volumeSound', JSON.stringify(e.target.value));
    },[setVolumeSound]);
   const handleClickMelody = useCallback(()=>{
       setPowerMelody(volumeMusic);
       setVolumeMusic(0);
   },[volumeMusic,setVolumeMusic]);
   const handleClickSound = useCallback(()=>{
       setPowerSound(volumeSound);
       setVolumeSound(0);
   },[volumeSound, setVolumeSound]);
   const handleClickPause = useCallback(()=>{
    setVolumeMusic(powerMelody);
},[setVolumeMusic,powerMelody]);
const handleClickMute = useCallback(()=>{
    setVolumeSound(powerSound);
},[setVolumeSound,powerSound]);

  return (
     
    <div className={styles.volume}>
  <div className = {styles.rangeWrapper}> 
 {volumeMusic<0.1? <img onClick = {handleClickPause} className = {styles.iconVolume} alt = "volumeMusic" src={pause}  
  />:
  <img onClick = {handleClickMelody} className = {styles.iconVolume} alt = "volumeMusic" src={melody}  
  />}
  <input onChange = {handleVolumeMusic}
   type="range" min="0" step="0.1" max="1" value = {volumeMusic} className={styles.range} id="rangeM"/>
   </div>
  <div className = {styles.rangeWrapper}>
  {volumeSound<0.1?<img onClick = {handleClickMute} className = {styles.iconVolume} alt = "volumeSound" src={mute}  
  />:
  <img onClick = {handleClickSound} className = {styles.iconVolume} alt = "volumeSound" src={sound}  
  />}
      <input onChange = {handleVolumeSound}
       type="range" min="0" step="0.1" max="1" value = {volumeSound} className={styles.range} id="rangeS"/>
      </div>
</div>

  );
}