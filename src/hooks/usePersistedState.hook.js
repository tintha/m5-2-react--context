import React from "react";

export default function usePersistedState(defaultState, key) {
  const [state, setState] = React.useState(() => {
    const persistedState = window.localStorage.getItem(key);
    if (persistedState !== null) {
      return JSON.parse(persistedState);
    } else {
      return defaultState;
    }
  });

  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
  return [state, setState];
}