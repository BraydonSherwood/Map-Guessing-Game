import { useCallback, useState } from "react";
import airports from "./airports.json";
import { getDistanceInKm } from "./distance.js";
import AirportMap from "./AirportMap.jsx";

export default function App() {
  const [airport, setAirport] = useState(() => pickAirport());
  const [guess, setGuess] = useState(null);

  const nextAirport = useCallback(() => {
    setAirport((current) => pickAirport(current?.name));
    setGuess(null);
  }, []);

  const distance = guess && airport ? getDistanceInKm(guess, airport) : null;

  return (
    <main className="page-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="Around the World home">
          <span className="brand-icon">✈</span>
          <span>Around the World</span>
        </a>
        <span className="tag">GEOGRAPHY CHALLENGE</span>
      </header>

      <section className="game-panel">
        <div className="intro">
          <p className="eyebrow">CAN YOU FIND IT?</p>
          <h1>Where in the world is this airport?</h1>
          <p className="subheading">
            {guess
              ? "Here's how close your guess was. Ready for another round?"
              : "Click anywhere on the map to guess the location of the airport below."}
          </p>
        </div>

        <div className="airport-card">
          <div className="airport-symbol">⌖</div>
          <div>
            <p className="card-label">YOUR DESTINATION</p>
            <h2>{airport.name}</h2>
          </div>
        </div>

        {distance !== null && (
          <div className="result-card" role="status">
            <div>
              <p className="card-label">DISTANCE FROM YOUR GUESS</p>
              <p className="distance">{distance.toLocaleString()} <span>km</span></p>
            </div>
            <p className="result-note">
              {distance < 100
                ? "Incredible accuracy!"
                : distance < 500
                  ? "Nice guess, you were close."
                  : "Keep exploring and try again."}
            </p>
          </div>
        )}

        <AirportMap airport={airport} guess={guess} onGuess={setGuess} />

        <div className="map-footer">
          <span className="map-hint">
            <span className="hint-dot" />
            {guess ? "Location revealed" : "Select a spot on the map to place your guess"}
          </span>
          <button className="next-button" onClick={nextAirport}>
            Next airport <span aria-hidden="true">→</span>
          </button>
        </div>
      </section>

      <footer className="footer">
        <span>Built with React and Leaflet</span>
        <span>Map data © OpenStreetMap contributors</span>
      </footer>
    </main>
  );
}

function pickAirport(previousName) {
  const options = airports.filter((item) => item.name !== previousName);
  return options[Math.floor(Math.random() * options.length)];
}
