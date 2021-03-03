import { INIT_GAME, setCards } from '../CardsFieldContainer/cardsActions';
import shuffle from '../CardsFieldContainer/shuffleFunc';
import { flags, flagCardShirt } from '../../assets/img/flags/flags';
import { countries } from '../../assets/img/countries/countries';

const initializeMiddleware = (store) => (next) => (action) => {
  if (action.type === INIT_GAME) {
    const { menuReducer: { gameDifficulty, cardsShirt } } = store.getState();
    const cardsImages = cardsShirt === flagCardShirt ? flags : countries;
    const requiredCards = cardsImages.slice(0, gameDifficulty);
    const cardsArray = shuffle([...requiredCards, ...requiredCards].map((card, index) => ({
      src: card,
      opened: false,
      hidden: false,
      index,
    })));
    store.dispatch(setCards(cardsArray));
    localStorage.setItem('cards', JSON.stringify(cardsArray));
      } else {
    next(action);
  }
};

export default initializeMiddleware;