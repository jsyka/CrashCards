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

  const [card, setCard] = useState("");

  useEffect(() => {
    axios.get("/api/cards/")
      .then((response) => {
        console.log(response.data);  // Log the response data
        if (response.data.length > 0) {
          setCard(response.data[0].title);  // Adjust based on your data structure
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
      <h1>{card}</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
