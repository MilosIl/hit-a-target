import "./App.css";
import { useState, useEffect } from "react";

import Square from "./Components/Square";
import Target from "./Components/Target";
function App() {

  const [target, setTarget] = useState<boolean[]>(new Array(9).fill(false));
  const [score, setScore] = useState<number>(0);
  const [mode, setMode] = useState(1000);
  function setMoleVisibility(index: number, isVisible: boolean) {
    setTarget((curTarget) => {
      const newtarget = [...curTarget];
      newtarget[index] = isVisible;
      return newtarget;
    });
  }
  function changeMode(speed: number) {
    setMode(speed)
    return speed;
  }

  function hitTarget(index: number) {
    if (!target[index]) return;
    setMoleVisibility(index, false);
    setScore((score) => score + 1);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * target.length);
      setMoleVisibility(randomIndex, true);
      setTimeout(() => {
        setMoleVisibility(randomIndex, false);
      }, mode);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [target, mode]);

  return (
    <div className="container">
      <h1>Score: {score}</h1>

      <div className="difficulty">
        Set difficulty:
        <button onClick={() => changeMode(800)}>easy</button>
        <button onClick={() => changeMode(500)}>medium</button>
        <button onClick={() => changeMode(300)}>hard</button>
      </div>
      <div className="target-container">
        {target.map((isTarget, index) => {
          return (
            <div
              onClick={() => {
                hitTarget(index);
              }}
              key={index}>
              {isTarget ? <Target /> : <Square />}
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default App;
