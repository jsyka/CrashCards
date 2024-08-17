import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios'
import './App.css'

function App() {
  // const [card, setCard] = useState("");

  // useEffect(() => {
  //   axios.get("/api/cards/")
  //     .then((response) => {
  //       setCard(response.data.card);
  //     })
  //     .catch((error) => {
  //       console.error("There was an error!", error);
  //     });
  // }, []);

  const [cards, setCard] = useState("");

  useEffect(() => {
    axios.get("/api/cards/")
      .then((response) => {
        console.log(response.data);  // Log the response data
        if (response.data.length > 0) {
          setCard(response.data);  // Chooses what field to display from db
        } else {
          setCard("No cards found");
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
        setCard("Error fetching cards");
      });
  }, []);

  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Cards</h1>
      <div className="cards">
        {cards.length > 0 ? (
          cards.map((card) => (
            <div key={card.title} className="card">
              <h2>{card.title}</h2>
              <p>Front: {card.card_front}</p>
              <p>Back: {card.card_back}</p>
              <p>Created At: {card.created_at}</p>
            </div>
          ))
        ) : (
          <p>No cards available</p>
        )}
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
