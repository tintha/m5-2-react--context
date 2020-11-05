import React, { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import GlobalStyles from "./GlobalStyles";
import Home from "./Home";
import Game from "./Game";
import { GameContext } from './GameContext';
import useInterval from "../hooks/use-interval.hook";

function App() {
 
  const { 
    numCookies, 
    setNumCookies, 
    cookiesPerSecond, 
    timeClosed, 
    setTimeClosed 
  } = React.useContext(GameContext);

  window.addEventListener("beforeunload", () => {  
      setTimeClosed(((new Date().getTime())));
  });

  window.addEventListener("load", () => {
    const timeOpened = ((new Date().getTime()));
    const timeDiff = Math.floor((timeOpened - timeClosed) / 1000);
    const cookiesEarnedWhileAway = (timeDiff * cookiesPerSecond);
    console.log(`Diff: ${timeDiff}`);
    console.log(cookiesPerSecond);
    console.log(cookiesEarnedWhileAway);
    setNumCookies(numCookies + cookiesEarnedWhileAway);
  });

  
  useInterval(() => {
    setNumCookies(numCookies + cookiesPerSecond);
  }, 1000);

  return (
    <>
      <GlobalStyles />
      <Router>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/game">
          <Game />
        </Route>
      </Router>
    </>
  );
}

export default App;
