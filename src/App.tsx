import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [target, setTarget] = useState<boolean[]>(new Array(9).fill(false));
  const [score, setScore] = useState<number>(0);
  const [maxScore, setMaxScore] = useState<number>(0);
  const [mode, setMode] = useState<number>(1000);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  function setTargetVisibility(index: number, isVisible: boolean) {
    setTarget((curTarget) => {
      const newTarget = [...curTarget];
      newTarget[index] = isVisible;
      return newTarget;
    });
  }
  function StartGame() {
    setIsGameOver(true);
    setMaxScore(0);
    if (isGameOver) {
      setScore(0);
    }
  }

  function changeMode(speed: number, size: string) {
    document.documentElement.style.setProperty("--width-target", size);
    setMode(speed);
    return { speed, size };
  }

  function hitTarget(index: number) {
    if (!target[index]) return;
    setTargetVisibility(index, false);
    setScore((score) => score + 1);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      let randomIndex = Math.floor(Math.random() * target.length);
      if (!isGameOver) {
        return (randomIndex = 0);
      }
      setTargetVisibility(randomIndex, true);
      setMaxScore(maxScore + 1);
      setTimeout(() => {
        setTargetVisibility(randomIndex, false);
      }, mode);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [target, mode, isGameOver, maxScore]);

  return (
    <div className="container">
      <h1>Improve your reflexes and mouse control.</h1>
      <div className="score">
        {isGameOver ? (
          <button onClick={() => setIsGameOver(!isGameOver)}>
            {isGameOver ? "stop game" : "reset game"}
          </button>
        ) : (
          <button onClick={StartGame}>start game</button>
        )}

        <p className="title">
          Score: {score}/{maxScore}
        </p>
      </div>
      <div className="difficulty">
        Set difficulty:
        <button onClick={() => changeMode(800, "8em")}>easy</button>
        <button onClick={() => changeMode(600, "5em")}>medium</button>
        <button onClick={() => changeMode(400, "3em")}>hard</button>
      </div>
      <div className="target-container">
        {target.map((isTarget, index) => {
          return (
            <div
              onClick={() => {
                hitTarget(index);
              }}
              className={isTarget ? "target" : "square"}
              key={index}>
              {isTarget ? "hit" : ""}
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default App;
