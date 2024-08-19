import "./Hero.css";
import { Link } from "react-router-dom";

export default function HeroPage() {
  // Landing/Home Page
  return (
    <div className="hero">
      <div className="hero-banner">
        <h1 className="title">
          Welcome to <span className="accent">CrashCards</span>!
        </h1>
        <div className="buttons">
          <Link to="/login">
            <button id="log-in">Log In</button>
          </Link>
          <Link to="/sign-up">
            <button id="sign-in">Sign Up</button>
          </Link>
        </div>
      </div>
      <div className="description">
        <h2>What is CrashCards?</h2>
        <p>
          CrashCards is an innovative tool designed to streamline your study process. By simply taking photos of your notes or entering text, CrashCards automatically generates flashcards for you to review. It's perfect for students and professionals looking to enhance their learning efficiency and retain information more effectively. Say goodbye to the hassle of manual flashcard creation and let CrashCards do the work, so you can focus on mastering the material.
          No premium plans, hidden fees, or paywalls!
        </p>
      </div>
    </div>
  );
}
