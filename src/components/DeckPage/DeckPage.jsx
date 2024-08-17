import React from "react";
import "./DeckPage.css";
import Cards from "../DeckElements/Card";
import Deck from "../DeckElements/Deck";

const DeckPage = () => {
  return (
    <div className="deck-page">
      <div className="deck-page-container">
        <h1>Decklist</h1>
        <div className="deck-container">
        <Deck/>
        <Deck/>
        <Deck/>
        </div>
      </div>
    </div>
  );
};

export default DeckPage;
