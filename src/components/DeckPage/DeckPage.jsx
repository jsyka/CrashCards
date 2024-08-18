import {React, useState, useEffect} from "react";
import axios from 'axios'
import "./DeckPage.css";
import Cards from "../DeckElements/Card";
import Deck from "../DeckElements/Deck";

const DeckPage = () => {
  const [ heading, setHeading ] = useState('Decklist');
  const [ decks, setDecks ] = useState([]);
  const [ cards, setCards ] = useState(<></>);
  const [ viewingDeck, setViewingDeck ] = useState(false);

 const changeHeading = (newHeading) => {
setHeading(newHeading);
 }

  useEffect(() => {
    axios.get("/api/carddeck/")
      .then((response) => {
        console.log(response.data);  // Log the response data
        if (response.data.length > 0) {
          setDecks(response.data);  // Chooses what field to display from db
        } else {
          setDecks([]);
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
        setDecks([]);
      });
  }, []);

  const deckList = decks.map(deck => (
    <Deck title={deck.title} onClick={() => updateContent(deck)} key={deck.id}/>
  ))

  function updateContent(deck) {
    console.log(deck);
    setViewingDeck(true);
    setCards(<Cards deck={deck.cards}/>);
    changeHeading(deck.title);
  }

  function backToMain() {
    setViewingDeck(false);
    changeHeading('Decklist');
  }

  return (
    <div className="deck-page">
      <div className="deck-page-container">
        <h1>{heading}</h1>
        {viewingDeck? <button className='back'onClick={backToMain}> Go Back</button>: ''}
        {/* <h1 onClick={backToMain}>{viewingDeck? 'Decklist' : deck.title}</h1> */}
        <div className="deck-container">
          {viewingDeck ? cards : deckList}
        </div>
      </div>
    </div>
  );
};

export default DeckPage;
