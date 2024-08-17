import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios'
import './App.css'

function App() {

  // for retrieving cards from the database
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

  // for retrieving users from the database
  const [users, setUser] = useState("");

  useEffect(() => {
    axios.get("/api/user/")
      .then((response) => {
        console.log(response.data);  // Log the response data
        if (response.data.length > 0) {
          setUser(response.data);  // Chooses what field to display from db
        } else {
          setUser("No cards found");
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
        setUser("Error fetching cards");
      });
  }, []);

  // for passing data to db
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    axios
      .post("/api/user/", data)
      .then((response) => {
        console.log("Form submitted successfully", response);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
};

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
      <h1>Users</h1>
      <div className="cards">
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user.username} className="card">
              <h2>{user.username}</h2>
            </div>
          ))
        ) : (
          <p>No users available</p>
        )}
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
