import React, { useCallback, useEffect, useState } from 'react';

import timeConverter from '../Timer/timeConverter';
import styles from './styles.module.css';

function Top10Popup({ name, results, player, getAllResults }) {
  const [resultsGame, setResultsGame] = useState([]);
  const [nameButton, setNameBatton] = useState('Show results');
  const [isShowResult, setIsShowResult] = useState(false);
  const sortTop = (arrayResults) => {
    const sortedArrResults = [...arrayResults];

    sortedArrResults.sort(function (a, b) {
      if (a.result > b.result) {
        return 1;
      }
      if (a.result < b.result) {
        return -1;
      }
      return 0;
    });
    return sortedArrResults.slice(0, 10 || sortedArrResults.length);
  };

  const getResults = useCallback(async () => {
    const currentResults = await getAllResults();
    const top10 = sortTop(currentResults.userresults);
    if (top10) return top10;
  }, [getAllResults]);

  const handleClickShow = useCallback(async () => {
    const getTop10 = await getResults();
    if (getTop10) {
      setResultsGame(getTop10);
      setIsShowResult(!isShowResult);
    }
  }, [getResults, isShowResult]);

  useEffect(() => {
    isShowResult
      ? setNameBatton('Hide results')
      : setNameBatton('Show results');
  }, [isShowResult]);

  return (
    <div className={styles.popupContainer}>
      <h4>{name}</h4>

      <div className={styles.resultContainer}>
        <div>Difficulty</div>
        <div>Result </div>
      </div>

      {resultsGame.length && isShowResult ? (
        resultsGame.map((item) => (
          <div className={styles.playerResults} key={item._id}>
            <div className={styles.playerName}>{item.user}</div>
            <div className={styles.resultContainer}>
              <div>{item.difficulty}</div>
              <div>{timeConverter(item.result)}</div>
            </div>
          </div>
        ))
      ) : (
        <></>
      )}
      <button
        type='button'
        className={styles.buttonShow}
        onClick={handleClickShow}
      >
        {nameButton}
      </button>
    </div>
  );
}

export default React.memo(Top10Popup);
