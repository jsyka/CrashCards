import { useState, useEffect, } from 'react'
import axios from 'axios'
import './App.css'
import HeroPage from './components/HeroPage/Hero.jsx'
import { Route, Routes } from 'react-router-dom'
import SideBar from './components/SideBar/SideBar.jsx'
import DeckPage from './components/DeckPage/DeckPage.jsx'

function App() {

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
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm();

  // const onSubmit = (data) => {
  //   axios
  //     .post("/api/user/", data)
  //     .then((response) => {
  //       console.log("Form submitted successfully", response);
  //     })
  //     .catch((error) => {
  //       console.error("There was an error!", error);
  //     });
  // };

  // useEffect(() => {
  //   // Fetch data from the OCR API endpoint
  //   axios.get('http://localhost:5001/api/analyze-image')
  //     .then(response => {
  //       // Log the response data to the console
  //       console.log('API Response:', response.data);
  //     })
  //     .catch(error => {
  //       // Log any errors to the console
  //       console.error('API Error:', error);
  //     });
  // }, []);


  return (
    <>
      <SideBar/>
      <div className='page-content'>
      <Routes>
        <Route path='/home' element={<HeroPage/>}/>
        <Route path='/my-decks' element={<DeckPage/>}/>
      </Routes>
      </div>
    </>
  )
}

export default App
