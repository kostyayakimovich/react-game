export default function shuffle(array) {
  
  if(JSON.parse(localStorage.getItem('cardsHidden')))
   return JSON.parse(localStorage.getItem('cardsHidden'));
  if(JSON.parse(localStorage.getItem('cards')))
   return JSON.parse(localStorage.getItem('cards'));
  const shuffledArray = [...array];
    let currentIndex = shuffledArray.length;
    let temporaryValue;
    let randomIndex;
  
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      temporaryValue = shuffledArray[currentIndex];
      shuffledArray[currentIndex] = shuffledArray[randomIndex];
      shuffledArray[randomIndex] = temporaryValue;
    }
  
    return shuffledArray;
  }