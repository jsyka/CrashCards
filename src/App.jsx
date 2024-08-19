import './App.css'
import HeroPage from './components/HeroPage/Hero.jsx'
import { Route, Routes } from 'react-router-dom'
import SideBar from './components/SideBar/SideBar.jsx'
import DeckPage from './components/DeckPage/DeckPage.jsx'
import CreatePage from './components/CreatePage/CreatePage.jsx'
import Sign_Up from './components/Sign_Up.jsx'
import Login from './components/Login.jsx'


function App() {
  return (
    <>
      <SideBar/>
      <div className='page-content'>
      <Routes>
        <Route path='/home' element={<HeroPage/>}/>
        <Route path='/my-decks' element={<DeckPage/>}/>
        <Route path='/new' element={<CreatePage/>}/>
        <Route path='/sign-up' element={<Sign_Up/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
      </div>
    </>
  )
}

export default App
