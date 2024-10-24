import { useState, useEffect } from "react";
import "./App.css";

const api_endpoint = "https://api.frontendexpert.io/api/fe/wordle-words";
const guess_length = 5;
function App() {
  const [solution, setSolution] = useState("");
  const [guesses, setGuesses] = useState(Array(6).fill(null));
  const [currentGuess, setCurrentGuess] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    // fetch all words from api endpoint and randomly set a solution
    const fetchWord = async () => {
      const response = await fetch(api_endpoint);
      const words = await response.json();
      const randomWord = words[Math.floor(Math.random() * words.length)];
      setSolution(randomWord.toLowerCase());
    };
    fetchWord();
  }, []);

  useEffect(() => {
    const handleType = (e) => {
      if (isGameOver) {
        return;
      }
      if (e.key === "Enter") {
        if (currentGuess.length !== 5) {
          return;
        }
        // New arr to not mutate the existing one
        const newGuesses = [...guesses];
        newGuesses[guesses.findIndex((val) => val == null)] = currentGuess;
        setGuesses(newGuesses);
        setCurrentGuess("");
        // if user correctly guesses, end the game
        const isCorrect = solution === currentGuess;
        if (isCorrect) {
          setIsGameOver(true);
          // alert("You Won!");
          // return;
        }
        setIsGameOver(true);
      }
      // If user gusses 5 letters then return
      if (currentGuess.length >= 5) return;
      // Remove the last element from the string on backspace
      if (e.key === "Backspace") {
        setCurrentGuess(currentGuess.slice(0, -1));
        return;
      }
      // only allow letters
      const isLetter = e.key.match(/^[a-z]{1}$/) != null;
      if (!isLetter) {
        // use prev state
        setCurrentGuess((oldGuess) => oldGuess + e.key);
      }
    };
    window.addEventListener("keydown", handleType);

    return () => window.removeEventListener("keydown", handleType);
  }, [currentGuess, isGameOver, solution, guesses]);

  return (
    <div className="board">
      {guesses.map((guess, i) => {
        // adding the guess to the each individual tile by checking if current guess is null, if so display current guess input field, else display guessed word
        // so if the index is the same the index we currently are (or null), use the current guess
        const isCurrentGuess = i === guesses.findIndex((val) => val == null);
        return (
          <Line
            guess={isCurrentGuess ? currentGuess : guess ?? ""}
            isFinal={!isCurrentGuess && guess != null}
            solution={solution}
          />
        );
      })}
    </div>
  );
}

function Line({ guess, isFinal, solution }) {
  const tiles = [];
  for (let i = 0; i < guess_length; i++) {
    const char = guess[i];
    let className = "tile";
    if (isFinal) {
      if (char === solution[i]) {
        className += " correct";
      } else if (solution.includes(char)) {
        className += " close";
      } else {
        className += " incorrect";
      }
    }
    tiles.push(
      <div key={i} className={className}>
        {char}
      </div>
    );
  }
  return <div className="line">{tiles}</div>;
}
export default App;
