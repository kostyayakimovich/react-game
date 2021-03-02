import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useSound from 'use-sound';
import CardsField from '../../components/CardsField';
import pick from '../../assets/audio/pick.mp3';
import success from '../../assets/audio/success.mp3';
import wrong from '../../assets/audio/wrong.mp3';

import {
  openCard,
  hideCard,
  closeCard,
  setOpenedCard,
  deleteOpenedCard,
  blockClick,
} from './cardsActions';

function CardsFieldContainer({
  volumeSound,
  volumeMusic,
  playSoundGame,
  stop,
  isMusic2,
  stateMusic,
}) {
  const dispatch = useDispatch();
  const openedCard = useSelector((state) => state.cardsReducer.openedCard);
  const isBlockedClick = useSelector(
    (state) => state.cardsReducer.isBlockedClick
  );
  const cards = useSelector((state) => state.cardsReducer.cards);
  const cardsShirt = useSelector((state) => state.menuReducer.cardsShirt);
  const [playPick] = useSound(pick, {
    volume:
      `${(volumeSound * 0.1).toFixed(1)}` ||
      `${(localStorage.getItem('volumSound') * 0.1).toFixed(1)}`,
  });
  const [playSuccess] = useSound(success, {
    volume:
      `${(volumeSound * 0.1).toFixed(1)}` ||
      `${(localStorage.getItem('volumSound') * 0.1).toFixed(1)}`,
  });
  const [playWrong] = useSound(wrong, {
    volume:
      `${(volumeSound * 0.1).toFixed(1)}` ||
      `${(localStorage.getItem('volumSound') * 0.1).toFixed(1)}`,
  });

  useEffect(() => {
    if (stateMusic === 'play') playSoundGame();
    else if (stateMusic === 'stop') stop();
    else stop();
  }, [playSoundGame, stateMusic, stop]);

  useEffect(() => {
    if (volumeMusic < 1) stop();
  }, [volumeMusic, stop]);

  const onClick = useCallback(
    (index, src) => {
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
    },
    [dispatch, isBlockedClick, openedCard, playPick, playSuccess, playWrong]
  );

  useEffect(() => {
    return () => localStorage.removeItem('cards');
  }, []);
  useEffect(() => {
    return () => localStorage.removeItem('cardsHidden');
  }, []);
  useEffect(() => {
    return () => localStorage.removeItem('isWinCount');
  }, []);
  useEffect(() => {
    return () => onclick;
  }, []);

  return <CardsField onClick={onClick} cards={cards} cardsShirt={cardsShirt} />;
}

export default React.memo(CardsFieldContainer);
