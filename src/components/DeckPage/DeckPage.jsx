import {React, useState, useEffect} from "react";
import axios from 'axios'
import "./DeckPage.css";
import "./Deck.css";
import Cards from "../DeckElements/Card";

export default function DeckPage() {
  const [ heading, setHeading ] = useState('Decklist');
  const [ decks, setDecks ] = useState([]);
  const [ cards, setCards ] = useState(<></>);
  const [ viewingDeck, setViewingDeck ] = useState(false); //is user looking at one specific deck
  const [ showPopup, setShowPopup ] = useState(false); //is user looking at edit menu popup

  const changeHeading = (newHeading) => {
    setHeading(newHeading);
  }

  //retrieve all decks
  useEffect(() => {
    axios.get("/api/carddeck/")
      .then((response) => {
        if (response.data.length > 0) {
          setDecks(response.data);
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

  //when user clicks on a deck, set viewingDeck true, show the cards, change the heading
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

  function togglePopup() {
    setShowPopup(!showPopup);
  }

  return (
    <div className="deck-page">
      <div className="deck-page-container">
        <div className="heading">
          <h1>{heading}</h1>
          {viewingDeck && <img src="https://www.svgrepo.com/show/42233/pencil-edit-button.svg" className="edit-icon" onClick={togglePopup} />}
        </div>
        {viewingDeck ? <button className='back'onClick={backToMain}>Go Back to Decklist</button> : ''}
        <div className="deck-container">
          {viewingDeck ? cards : deckList}
        </div>
      </div>

      {showPopup && 
      <div className="popup">
        <div className="popup-content">
          <button>Edit Title</button>
          <button className="delete">Delete Deck</button>
          <button onClick={togglePopup}>Close Edit Menu</button>
        </div>
      </div>
      }
    </div>
  );
};

function Deck({title, onClick}) {
  return (
    <div className='deck-card' onClick={onClick}>
      <div className='deck-title'>{title}</div>
    </div>
  )
};