import './Hero.css'
import Cards from './Card.jsx'

export default function HeroPage() {

    return (
        <div className="hero">
            <div className="hero-banner">
                <h1 className="title">Welcome to <span className="accent">CrashCards</span></h1>
                <div className="buttons">
                    <button id="learn-more">Learn More</button>
                    <button id="sign-in">Sign In</button>
                </div>
            </div>
            <div> {/* make so if you're signed in this shows*/}
                <h2>Your Decks</h2>
                {/* put decks here and then makes cards only show when click on deck*/}
                <Cards />
            </div>
            <div>
                <div>
                What is CrashCards?
                </div>
                <div>best flashcard site in the world!!!</div>
            </div>
        </div>
    )
}