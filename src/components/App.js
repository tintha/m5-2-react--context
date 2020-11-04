import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import GlobalStyles from "./GlobalStyles";
import Home from "./Home";
import Game from "./Game";
import usePersistedState from '../hooks/usePersistedState.hook';

function App(props) {
  const [numCookies, setNumCookies] = usePersistedState(1000, 'numCookies');
  const [purchasedItems, setPurchasedItems] = usePersistedState({
    cursor: 0,
    grandma: 0,
    farm: 0,
  }, 'purchasedItems')

  return (
    <>
      <GlobalStyles />
      <Router>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/game">
          <Game
            numCookies={numCookies}
            setNumCookies={setNumCookies}
            purchasedItems={purchasedItems}
            setPurchasedItems={setPurchasedItems} />
        </Route>
      </Router>
    </>
  );
}

export default App;
