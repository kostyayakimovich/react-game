import React,{useEffect} from 'react';
import PropTypes from 'prop-types';

import Card from '../Card';
import useSound from 'use-sound';
import soundGame from '../../assets/audio/soundGame.mp3';
import styles from './styles.module.css';

function CardField({ cards, onClick, cardsShirt,volumeMusic}) {
  
  const [playSoundGame,{stop,isPlaying}] = useSound(soundGame, {volume:volumeMusic});
   
 useEffect(()=>{
  playSoundGame();  
    if(!isPlaying) playSoundGame();     
   return () =>stop();   
},[playSoundGame,stop,isPlaying])

  return (
    <div className={styles.cardField}>
      {
        cards.map((card) => (
          <Card
            key={card.index}
            cardsAmount={cards.length}
            cardsShirt={cardsShirt}
            index={card.index}
            onClick={onClick}
            picture={card.src}
            opened={card.opened}
            hidden={card.hidden}
          />
        ))
        }
    </div>
  );
}

CardField.propTypes = {
  cards: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
  cardsShirt: PropTypes.string.isRequired,
};

export default React.memo(CardField);