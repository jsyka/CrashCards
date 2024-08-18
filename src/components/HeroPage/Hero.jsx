import './Hero.css'
import Cards from '../DeckElements/Card.jsx'
import { Link } from 'react-router-dom'

export default function HeroPage() {

    return (
        <div className="hero">
            <div className="hero-banner">
                <h1 className="title">Welcome to <span className="accent">CrashCards</span>!</h1>
                <div className="buttons">
                
                    <button id="log-in" >Log In</button>
                    <button id="sign-in">Sign Up</button>
                </div>
            </div>
            <div className="description">
                <h2>What is CrashCards?</h2>
                <p>the best flashcard site ever! no premium plans, hidden fees, or paywalls!</p>
            </div>
        </div>
    )
}