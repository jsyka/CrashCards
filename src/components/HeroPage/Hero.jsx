import './Hero.css'
import Cards from '../DeckElements/Card.jsx'

export default function HeroPage() {

    return (
        <div className="hero">
            <div className="hero-banner">
                <h1 className="title">Welcome to <span className="accent">CrashCards</span></h1>
                <div className="buttons">
                    {/* <button id="learn-more">Learn More</button> */}
                    <button id="sign-in">Sign In</button>
                </div>
            </div>
            <div className="description">
                <h2>What is CrashCards?</h2>
                <div>the best flashcard site in the world!!!</div>
            </div>
        </div>
    )
}