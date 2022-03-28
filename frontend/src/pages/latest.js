import React, { useState, useEffect } from "react";
import { getUserDecks } from "../services/deckService";

import { getCurrentUser } from "../services/authService";
import { Link } from "react-router-dom";

const Home = () => {
  const user = getCurrentUser();
  const [decks, setDecks] = useState();
  useEffect(() => {
    getUserDecks(user.username)
    .then((res) => setDecks(res.data));
  }, []);
  return (
    <div>
      <div>
        <Link to={`/user/${user.username}`}>My Library</Link>
      </div>
      Latest Decks
      {decks &&
        decks.map((deck) => (
          <div key={deck._id}>
            <Link to={`/deck/${deck._id}`}>{deck.title}</Link>
          </div>
        ))}
    </div>
  );
};

export default Home;
