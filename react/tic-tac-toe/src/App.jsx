import { useState } from "react";
import Square from "./Square";

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null)); // state to hold the current set of squares
  const [isXNext, setIsXNext] = useState(boolean); // determines whose turn it is

  const handleClick = (idx) => {
    const squaresCopy = squares.slice(); // copy of the squares array to modify
    if (calculateWinner(squares) || squaresCopy[idx]) return; // if there's a winner or the square is filled, ignore the click

    squaresCopy[idx] = isXNext ? "X" : "O"; // set the square to X or O based on the current player
    setSquares(squaresCopy); // update the state with the new board
    setIsXNext(!isXNext); // switch turns
  };

  const calculateWinner = (squares) => {
    const lines = [
      // winning combinations
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]; // extract indexes of the squares
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a]; // return the winner if there's a match
      }
    }
    return null; // no winner yet
  };
  const isThereAWinner = calculateWinner(squares);
  const status = isThereAWinner
    ? `Winner: ${winner}`
    : `Next player: ${isXNext ? "X" : "O"}`;
  return (
      <div style={{ maxWidth: "200px" }}>
        <div style={{ clear: "both" }}>
          {Array.from({ length: 9 }).map((_, idx) => {
            <Square
              key={idx}
              value={squares[i]}
              onClick={() => handleClick(i)}
            />;
          })}
        </div>
        <div style={{ clear: "both", marginTop: "20px" }}>
          {status} {/* Display the current game status */}
        </div>
      </div>
  );
}

export default App;
