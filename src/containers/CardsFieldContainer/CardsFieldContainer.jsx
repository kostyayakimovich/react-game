import React, { useCallback, useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useSound from 'use-sound';
import CardsField from '../../components/CardsField';
import pick from '../../assets/audio/pick.mp3';
import success from '../../assets/audio/success.mp3';
import wrong from '../../assets/audio/wrong.mp3';
import soundGame from '../../assets/audio/soundGame.mp3';
import soundGame2 from '../../assets/audio/soundGame2.mp3';
import {
  openCard, hideCard, closeCard, setOpenedCard, deleteOpenedCard, blockClick,
} from './cardsActions';

function CardsFieldContainer({volumeSound, volumeMusic}) {
  const dispatch = useDispatch();
  const openedCard = useSelector((state) => state.cardsReducer.openedCard);
  const isBlockedClick = useSelector((state) => state.cardsReducer.isBlockedClick);
  const cards = useSelector((state) => state.cardsReducer.cards);
  const cardsShirt = useSelector((state) => state.menuReducer.cardsShirt);
const [playPick] = useSound(pick,  { volume: volumeSound });
const [playSuccess] = useSound(success,  { volume: volumeSound });
const [playWrong] = useSound(wrong,  { volume: volumeSound });

const[isMusic2, setIsMusic2]= useState(
  localStorage.getItem('musicGame')==="soundGame"?false:true);
const[musicGame, setMusicGame] = 
useState(  
  localStorage.getItem('musicGame')
||"soundGame");

const handleKeyPress = useCallback(  (event) => { 
   
    if (event.shiftKey&& event.code === 'Space') {
     if(localStorage.getItem('musicGame')==="soundGame"){
       setMusicGame("soundGame2");
       localStorage.setItem('musicGame', "soundGame2");
     }
     else{
      setMusicGame("soundGame");
      localStorage.setItem('musicGame',"soundGame"); 
     }
      
    }    
  },
  []
);
useEffect(()=>{
document.addEventListener("keydown", handleKeyPress, false);
return ()=>{
document.removeEventListener("keydown", handleKeyPress, false);
}
},[handleKeyPress])    

useEffect(()=>{
  musicGame === 'soundGame2'?  setIsMusic2(true) : setIsMusic2(false);
},[musicGame])


  const onClick = useCallback((index, src) => {
    if (isBlockedClick) return;
    
    dispatch(openCard(index));
playPick();
    if (openedCard) {
      
      if (index === openedCard.index) return;
      dispatch(blockClick());

      if (src === openedCard.src) {
            
        setTimeout(() => {
           playSuccess();
          dispatch(hideCard(src));
          dispatch(deleteOpenedCard());
        }, 1500);
      } else {
       
        setTimeout(() => {
          playWrong();
          dispatch(closeCard(src));
          dispatch(deleteOpenedCard());
        }, 1500);
      }
    } else {
      dispatch(setOpenedCard(src, index));
    }
  }, [dispatch, isBlockedClick, openedCard,playPick,playSuccess,playWrong]);
  const [playSoundGame,{stop,isPlaying}] =
   useSound(!isMusic2? soundGame:soundGame2, {volume:volumeMusic});
   
  useEffect(()=>{
   playSoundGame();  
     if(!isPlaying) playSoundGame();     
 },[playSoundGame,isPlaying])
 
 
 useEffect(()=>{    
    return () =>stop();   
 },[stop])

  useEffect(()=>{    
    return()=> localStorage.removeItem('cards');
   },[])
   useEffect(()=>{     
     return()=>  localStorage.removeItem('cardsHidden') ;
    },[])
    useEffect(()=>{     
     return()=>  localStorage.removeItem('isWinCount') ;
    },[])

  return (
    <CardsField onClick={onClick} cards={cards} cardsShirt={cardsShirt} />
  );
}

export default React.memo(CardsFieldContainer);