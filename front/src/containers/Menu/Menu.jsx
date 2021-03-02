import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
//import { useHttp } from '../../hooks/http.hook';

import {
  setCardsShirt,
  setGameDifficulty,
  setVisibleItem,
  setTimer,
} from './menuActions';
import styles from './styles.module.css';
import MenuItem from '../../components/MenuItem';
import {
  GameDifficultyPopup,
  CardsShirtPopup,
  RulesPopup,
  Top10Popup,
  TimerPopup,
  HotKeysPopup,
} from '../../components/Popup';
import {
  gameDifficulty,
  rules,
  cardsShirt,
  top,
  gameMenu,
  timer,
  hotKeys,
} from './manuItemsNames';
import { useReciveData } from '../../hooks/reciveData.hook';

export default function Menu() {
  const dispatch = useDispatch();
  const results = useSelector((state) => state.timerReducer.results);
  const visibleItemName = useSelector((state) => state.menuReducer.visibleItem);
  const player = useSelector((state) => state.playFormReducer.player);

  const gameDifficultyValue = useSelector(
    (state) => state.menuReducer.gameDifficulty
  );
  const cardsShirtValue = useSelector((state) => state.menuReducer.cardsShirt);
  const timerValue = useSelector((state) => state.menuReducer.timer);

  const showPopup = useCallback(
    (e) => {
      const eventElemName = e.currentTarget.dataset.name;
      if (eventElemName === visibleItemName) {
        dispatch(setVisibleItem(null));
      } else {
        dispatch(setVisibleItem(e.currentTarget.dataset.name));
      }
    },
    [dispatch, visibleItemName]
  );

  const selectGameDifficulty = useCallback(
    (e) => {
      dispatch(setGameDifficulty(e.target.value));
      localStorage.setItem('gameDifficulty', e.target.value);
    },
    [dispatch]
  );

  const selectCardsShirt = useCallback(
    (e) => {
      dispatch(setCardsShirt(e.target.value));
      localStorage.setItem('cardsShirt', e.target.value);
    },
    [dispatch]
  );

  const selectTimer = useCallback(
    (e) => {
      dispatch(setTimer(e.target.value));
      localStorage.setItem('timer', e.target.value);
    },
    [dispatch]
  );

  document.addEventListener('click', (e) => {
    if (!e.target.closest(`.${gameMenu}`)) {
      dispatch(setVisibleItem(null));
    }
  });

  const { request } = useReciveData();
  const getAllResults = useCallback(async () => {
    try {
      const data = await request('/pop', 'GET', null);

      return data;
    } catch (error) {}
  }, [request]);

  return (
    <div className={`${styles.menu} ${gameMenu}`}>
      <MenuItem name={top} onClick={showPopup}>
        {visibleItemName === top ? (
          <Top10Popup
            name={top}
            results={results}
            player={player}
            getAllResults={getAllResults}
          />
        ) : (
          ''
        )}
      </MenuItem>
      <MenuItem name={gameDifficulty} onClick={showPopup}>
        {visibleItemName === gameDifficulty ? (
          <GameDifficultyPopup
            onChange={selectGameDifficulty}
            name={gameDifficulty}
            value={gameDifficultyValue}
          />
        ) : (
          ''
        )}
      </MenuItem>
      <MenuItem name={cardsShirt} onClick={showPopup}>
        {visibleItemName === cardsShirt ? (
          <CardsShirtPopup
            name={cardsShirt}
            onChange={selectCardsShirt}
            value={cardsShirtValue}
          />
        ) : (
          ''
        )}
      </MenuItem>
      <MenuItem name={timer} onClick={showPopup}>
        {visibleItemName === timer ? (
          <TimerPopup name={timer} onChange={selectTimer} value={timerValue} />
        ) : (
          ''
        )}
      </MenuItem>
      <MenuItem name={hotKeys} onClick={showPopup}>
        {visibleItemName === hotKeys ? (
          <HotKeysPopup name={`6 ${hotKeys}`} />
        ) : (
          ''
        )}
      </MenuItem>
      <MenuItem name={rules} onClick={showPopup}>
        {visibleItemName === rules ? <RulesPopup name={rules} /> : ''}
      </MenuItem>
    </div>
  );
}
