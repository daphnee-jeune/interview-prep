import { useState, useEffect } from "react";

const api_endpoint = "https://api.frontendexpert.io/api/fe/wordle-words";
const wordLength = 5;
function App() {
  const [solution, setSolution] = useState("");
  const [guesses, setGuesses] = useState(Array(6).fill(null)); // there are 6 rows (guesses) total in the game
  const [currentGuess, setCurrentGuess] = useState(""); // current user guess
  const [isGameOver, setIsGameOver] = useState(false);

  // Fetch a random word from the API endpoint and set it as the solution in the state.
  useEffect(() => {
    const fetchWord = async () => {
      const response = await fetch(api_endpoint);
      const words = await response.json();
      const randomWord = words[Math.floor(Math.random() * words.length)];
      setSolution(randomWord);
    };
    fetchWord();
  }, []);

  // Update the guesses state whenever the user types a letter.
  useEffect(() => {
    const handleType = (e) => {
      if (isGameOver) return; // if game is over, return early to prevent unnecessary execution
      if (e.key === "Enter") {
        if (currentGuess.length !== 5) return;

        const newGuesses = [...guesses];
        newGuesses[guesses.findIndex((val) => val == null)] = currentGuess;
        setGuesses(newGuesses);
        setCurrentGuess("");

        const isCorrect = solution === currentGuess;
        if (isCorrect) setIsGameOver(true);
      }
      if (currentGuess.length >= 5) return;

      const isLetter = e.key.match(/^[a-z]{1}$/) != null;
      if (isLetter) {
        setCurrentGuess((prevGuess) => prevGuess + e.key);
      }

      if (e.key === "Backspace") {
        // handle delete char
        setCurrentGuess(currentGuess.slice(0, -1)); // remove the last letter of currentGuess
        return;
      }
    };
    window.addEventListener("keydown", handleType);

    return () => window.removeEventListener("keydown", handleType);
  }, [currentGuess, isGameOver, solution]);

  return (
    <div className="board">
      {/* Display the current word to be guessed */}
      <h1>Wordle Game</h1>
      {guesses.map((guess, i) => {
        const isCurrentGuess = i === guesses.findIndex((val) => val == null); // if the idx is the same as the current guess (first guess in the guesses arr thats null)
        return (
          <Line
            guess={isCurrentGuess ? currentGuess : guess ?? ""}
            isFinal={!isCurrentGuess && guess !== null} // if not current guess and guess is 5 letters, then guessing is done
            solution={solution}
          />
        ); // Adding the guess to the actual tile pt1
      })}
    </div>
  );
}

const Line = ({ guess, isFinal, solution }) => {
  const tiles = [];
  // Iterate through each row and add a tile for each letter in the guess
  for (let i = 0; i < wordLength; i++) {
    // using a for loop instead of map bc guess could be null
    const char = guess[i];
    let className = "tile";
    // handle tile coloring based on correctness
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
      <div key={i} className="tile">
        {char}
      </div>
    );
  }
  return <div className="line">{tiles}</div>;
};
export default App;
