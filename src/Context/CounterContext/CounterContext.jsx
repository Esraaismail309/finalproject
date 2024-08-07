import { useState } from "react";
import { createContext } from "react";

export const counterContext = createContext(0);

export default function CounterContextProvider(props) {
  const [counter, setCounter] = useState(0);

  function changeCounter() {
    setCounter(Math.random());
  }

  return (
    <counterContext.Provider value={{ counter, changeCounter }}>
      {props.children}
    </counterContext.Provider>
  );
}
