import {
    SET_CARDS_SHIRT, SET_VISIBLE_ITEM, SET_GAME_DIFFICULTY, SET_TIMER, SET_IS_END_TIMER
  } from './menuActions';
  import { flagCardShirt } from '../../assets/img/flags/flags';
  
  const initialState = {
    gameDifficulty:localStorage.getItem('gameDifficulty')|| '12',
    visibleItem: null,
    cardsShirt: localStorage.getItem('cardsShirt')|| flagCardShirt,
    timer:localStorage.getItem('timer')|| '60',
    isEndTimer: false,
  };
  
  export default function manuReducer(state = initialState, action) {
    switch (action.type) {
      case SET_VISIBLE_ITEM: {
        return {
          ...state,
          visibleItem: action.data,
        };
      }
  
      case SET_GAME_DIFFICULTY: {
        return {
          ...state,
          gameDifficulty: action.data,
        };
      }
  
      case SET_CARDS_SHIRT: {
        return {
          ...state,
          cardsShirt: action.data,
        };
      }

      case SET_TIMER: {
        return {
          ...state,
          timer: action.data,
        };
      }

      case SET_IS_END_TIMER: {
        return {
          ...state,
          isEndTimer: action.data,
        };
      }
  
      default: return state;
    }
  }