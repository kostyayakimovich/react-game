import {
    SET_CARDS_SHIRT, SET_VISIBLE_ITEM, SET_GAME_DIFFICULTY,
  } from './menuActions';
  import { flagCardShirt } from '../../assets/img/flags/flags';
  
  const initialState = {
    gameDifficulty: '12',
    visibleItem: null,
    cardsShirt: flagCardShirt,
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
  
      default: return state;
    }
  }