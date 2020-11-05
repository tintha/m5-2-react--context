import React from 'react';
import usePersistedState from '../hooks/usePersistedState.hook';
import { items } from '../data/data';

export const GameContext = React.createContext(null);

export const GameProvider = ({ children }) => {
  const [timeClosed, setTimeClosed] = usePersistedState(new Date().getTime(), 'timeClosed')
  const [numCookies, setNumCookies] = usePersistedState(1000, 'numCookies');
  const [purchasedItems, setPurchasedItems] = usePersistedState({
    cursor: 0,
    grandma: 0,
    farm: 0,
  }, 'purchasedItems')

  const calculateCookiesPerSecond = (purchasedItems) => {
    return Object.keys(purchasedItems).reduce((acc, itemId) => {
      const numOwned = purchasedItems[itemId];
      const item = items.find((item) => item.id === itemId);
      const value = item.value;
  
      return acc + value * numOwned;
    }, 0);
  };

  return (
    <GameContext.Provider 
      value={{
        numCookies,
        setNumCookies, 
        purchasedItems,
        setPurchasedItems,
        cookiesPerSecond: calculateCookiesPerSecond(purchasedItems),
        timeClosed,
        setTimeClosed
      }}>
        {children}
    </GameContext.Provider>);
};