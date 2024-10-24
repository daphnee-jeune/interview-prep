import React, { useState } from "react";
import "./App.css";

// Step-by-Step Plan:
// Create a deck of cards: Each card has a suit and value.
// Shuffle the deck: Shuffle the cards randomly.
// Deal cards to players: Deal two cards to each player.
// Determine the winner: Compare player hands and declare a winner.

const SUITS = ["♠", "♥", "♦", "♣"];
const VALUES = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
];

// Function to create a deck of cards
const createDeck = () => {
  const deck = [];
  for (let suit of SUITS) {
    for (let value of VALUES) {
      deck.push({ suit, value });
    }
  }
  return deck;
};

// Function to shuffle the deck
const shuffleDeck = (deck) => {
  return deck.sort(() => Math.random() - 0.5);
};

// Function to compare two poker hands (simplified comparison)
const compareHands = (player1, player2) => {
  const rank = (card) => VALUES.indexOf(card.value);
  const player1HandRank = Math.max(rank(player1[0]), rank(player1[1]));
  const player2HandRank = Math.max(rank(player2[0]), rank(player2[1]));

  if (player1HandRank > player2HandRank) return "Player 1 wins!";
  if (player1HandRank < player2HandRank) return "Player 2 wins!";
  return "It's a tie!";
};

const App = () => {
  const [deck, setDeck] = useState(shuffleDeck(createDeck()));
  const [player1Hand, setPlayer1Hand] = useState([]);
  const [player2Hand, setPlayer2Hand] = useState([]);
  const [winner, setWinner] = useState("");

  // Deal two cards to each player
  const dealCards = () => {
    const shuffledDeck = shuffleDeck(createDeck());
    setPlayer1Hand([shuffledDeck.pop(), shuffledDeck.pop()]);
    setPlayer2Hand([shuffledDeck.pop(), shuffledDeck.pop()]);
    setDeck(shuffledDeck);
    setWinner("");
  };

  // Determine the winner between player 1 and player 2
  const revealWinner = () => {
    const result = compareHands(player1Hand, player2Hand);
    setWinner(result);
  };

  return (
    <div className="App">
      <h1>Poker Game</h1>
      <div className="table">
        <div className="player">
          <h2>Player 1 Hand</h2>
          <div className="hand">
            {player1Hand.map((card, index) => (
              <div key={index} className="card">
                {card.value} {card.suit}
              </div>
            ))}
          </div>
        </div>

        <div className="player">
          <h2>Player 2 Hand</h2>
          <div className="hand">
            {player2Hand.map((card, index) => (
              <div key={index} className="card">
                {card.value} {card.suit}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="controls">
        <button onClick={dealCards}>Deal Cards</button>
        <button onClick={revealWinner}>Reveal Winner</button>
      </div>

      {winner && <h2 className="winner">{winner}</h2>}
    </div>
  );
};

export default App;
