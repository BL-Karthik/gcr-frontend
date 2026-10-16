
import { useEffect, useState } from "react";

const createMemoryCards = () => {
  const symbols = ["🍎", "🚀", "⭐", "🎵", "🐱", "⚽"];

  return [...symbols, ...symbols]
    .map((symbol, index) => ({
      symbol,
      id: `${symbol}-${index}`,
    }))
    .sort(() => Math.random() - 0.5);
};

function BreakZone({ loading, report, error }) {
  // Two-minute countdown starts when Break Zone opens.
  const [seconds, setSeconds] = useState(120);
  const [isRunning, setIsRunning] = useState(true);

  // Number guessing game.
  const [secretNumber, setSecretNumber] = useState(
    () => Math.floor(Math.random() * 20) + 1
  );
  const [guess, setGuess] = useState("");
  const [guessMessage, setGuessMessage] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [guessWon, setGuessWon] = useState(false);

  // Memory match game.
  const [cards, setCards] = useState([]);
  const [selected, setSelected] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);

  // Handle countdown.
  useEffect(() => {
    if (!isRunning || seconds <= 0) {
      return;
    }

    const timerId = setInterval(() => {
      setSeconds((previous) => Math.max(0, previous - 1));
    }, 1000);

    return () => clearInterval(timerId);
  }, [isRunning, seconds]);

  // Stop timer when it reaches zero.
  useEffect(() => {
    if (seconds === 0) {
      setIsRunning(false);
    }
  }, [seconds]);

  // Reset the timer to two minutes.
  const resetTimer = () => {
    setSeconds(120);
    setIsRunning(false);
  };

  // Guessing game logic.
  const checkGuess = (event) => {
    event.preventDefault();

    const number = Number(guess);

    if (
      guess.trim() === "" ||
      !Number.isInteger(number) ||
      number < 1 ||
      number > 20
    ) {
      setGuessMessage("Enter a whole number from 1 to 20.");
      return;
    }

    setAttempts((previous) => previous + 1);

    if (number === secretNumber) {
      setGuessMessage("Correct! 🎉 You found the number!");
      setGuessWon(true);
    } else if (number < secretNumber) {
      setGuessMessage("Try a higher number ⬆️");
    } else {
      setGuessMessage("Try a lower number ⬇️");
    }

    setGuess("");
  };

  const resetGuessGame = () => {
    setSecretNumber(Math.floor(Math.random() * 20) + 1);
    setGuess("");
    setGuessMessage("");
    setAttempts(0);
    setGuessWon(false);
  };

  // Start or restart the memory game.
  const startMemoryGame = () => {
    setCards(createMemoryCards());
    setSelected([]);
    setMatched([]);
    setMoves(0);
  };

  // Flip a memory card.
  const flipCard = (index) => {
    if (
      selected.includes(index) ||
      matched.includes(index) ||
      selected.length >= 2
    ) {
      return;
    }

    const nextSelected = [...selected, index];
    setSelected(nextSelected);

    if (nextSelected.length === 2) {
      setMoves((previous) => previous + 1);

      const [first, second] = nextSelected;

      if (cards[first].symbol === cards[second].symbol) {
        setMatched((previous) => [...previous, first, second]);
        setSelected([]);
      }
    }
  };

  // Hide two unmatched cards after a short delay.
  useEffect(() => {
    if (selected.length !== 2) {
      return;
    }

    const [first, second] = selected;

    if (cards[first]?.symbol === cards[second]?.symbol) {
      return;
    }

    const timeoutId = setTimeout(() => {
      setSelected([]);
    }, 800);

    return () => clearTimeout(timeoutId);
  }, [selected, cards]);

  const formattedTime =
    `${String(Math.floor(seconds / 60)).padStart(2, "0")}:` +
    `${String(seconds % 60).padStart(2, "0")}`;

  const allMatched =
    cards.length > 0 && matched.length === cards.length;

  return (
    <section className="page-content">
      <div className="welcome-section">
        <div>
          <p className="eyebrow">TAKE A QUICK BREAK</p>
          <h2>2-Minute Break Zone 🎮</h2>
          <p>
            Your report is processing. Relax and play while you wait!
          </p>
        </div>
      </div>

      {/* Countdown timer */}
      <section className="panel break-card">
        <h3>⏱ Two-Minute Timer</h3>

        <div className="timer-display">{formattedTime}</div>

        <div className="break-actions">
          <button
            className="primary-button"
            onClick={() => setIsRunning(true)}
            disabled={isRunning || seconds === 0}
          >
            Resume
          </button>

          <button
            className="secondary-button"
            onClick={() => setIsRunning(false)}
            disabled={!isRunning}
          >
            Pause
          </button>

          <button className="secondary-button" onClick={resetTimer}>
            Reset
          </button>
        </div>

        {seconds === 0 && (
          <p>Time is up! Hope you enjoyed your break! 🎉</p>
        )}
      </section>

      {/* Report generation status */}
      <section className="panel break-card">
        <h3> Report Generation Status</h3>

        {loading && (
          <div>
            <p>⏳ Generating your Google Sheet...</p>
            <p>You can play the games while you wait.</p>
            <div className="report-progress-track">
              <div className="report-progress-bar" />
            </div>
          </div>
        )}

        {!loading && report && report.success_flag && (
          <div>
            <p> {report.message || "Report generated successfully!"}</p>
            <p>
              <strong>Report:</strong> {report.report_name}
            </p>
            <p>
              <strong>Batch:</strong> {report.batch}
            </p>
            <p>
              <strong>Weeks:</strong> {report.start_week}–{report.end_week}
            </p>
            <p>
              <strong>Courses:</strong> {report.total_courses}
            </p>
            <p>
              <strong>Students:</strong> {report.total_students}
            </p>

            {report.report_url && (
              <a
                className="sheet-link"
                href={report.report_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open Google Sheet ↗
              </a>
            )}
          </div>
        )}

        {!loading && report && !report.success_flag && (
          <p> {report.message || "Report generation did not succeed."}</p>
        )}

        {!loading && error && (
          <p className="break-error" role="alert">
             {error}
          </p>
        )}
      </section>

      {/* Number guessing game */}
      <section className="panel break-card">
        <h3> Guess the Number</h3>
        <p>I'm thinking of a number between 1 and 20. Can you guess it?</p>

        <form onSubmit={checkGuess} className="break-actions">
          <input
            type="number"
            min="1"
            max="20"
            step="1"
            value={guess}
            onChange={(event) => setGuess(event.target.value)}
            placeholder="Enter your guess"
            disabled={guessWon}
          />

          <button
            className="primary-button"
            type="submit"
            disabled={guessWon}
          >
            Guess
          </button>
        </form>

        {guessMessage && <p>{guessMessage}</p>}
        <p>Attempts: {attempts}</p>

        <button className="secondary-button" onClick={resetGuessGame}>
          New Number
        </button>
      </section>
    </section>
  );
}

export default BreakZone;
