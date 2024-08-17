import { useState, useEffect } from 'react'
import './App.css'
import HeroPage from './components/HeroPage/Hero.jsx'
import Cards from './components/CardPage/Card.jsx'

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
      <HeroPage />
      <Cards />
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
    </>
  )
}

export default App
