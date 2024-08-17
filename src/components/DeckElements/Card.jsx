import { useState, useEffect } from 'react'
import axios from 'axios'
import './Card.css'

export default function Cards({deck}) {
    const [cards, setCard] = useState([]);
    const [currCard, setCurrCard] = useState(0);

    useEffect(() => {
        axios.get("/api/cards/")
        .then((response) => {
            console.log(response.data);  // Log the response data
            if (response.data.length > 0) {
            setCard(response.data);  // Chooses what field to display from db
            } else {
            setCard([]);
            }
        })
        .catch((error) => {
            console.error("There was an error!", error);
            setCard([]);
        });
    }, []);

    const cardsList = cards.map(card => (
        <FlashCard title={card.title} front={card.card_front} back={card.card_back} date={card.created_at} key={card.id}/>
    ));

    function prevCard() {
        if (currCard == 0) {
            setCurrCard(cards.length-1);
        } else {
            setCurrCard(currCard-1);
        }
    }

    function nextCard() {
        if (currCard == cards.length-1) {
            setCurrCard(0);
        } else {
            setCurrCard(currCard+1);
        }
    }

    return (
        <div className="allcards">
            <h2>{deck} Cards</h2>
            <div className="cards">
                {cardsList.length > 0 ? cardsList[currCard] : <div>No Cards Found</div>}
            </div>
            <div className="buttons"> 
                <button onClick={prevCard}>Previous</button>
                <button onClick={nextCard}>Next</button>
            </div>
        </div>
    )
}

function FlashCard({title, front, back, date}) {
    const [ showBack, setShowBack ] = useState(false);
    const [ flip, setFlip ] = useState(false);
    const [ isFlipping, setIsFlipping ] = useState(false);

    function handleClick() {
        if (isFlipping) return;

        setFlip(!flip);
        setIsFlipping(true);
        setTimeout(() => {
            setShowBack(!showBack);
            setIsFlipping(false);
        }, 280);
    }

    let flashCardClass = "flashcard";
    if (showBack) flashCardClass += " back";
    if (flip) flashCardClass += " flip";

    return (
        <div className="flashcard-container" onClick={handleClick}>
            <div className={flashCardClass} >
                {!showBack && <div className="card-front">
                    <div className="title">{title}</div>
                    <div className="card-text">{front}</div>
                </div>}
                {showBack && <div className="card-back">
                    {/* <div className="title">{title}</div> */}
                    <div className="card-text">{back}</div>
                </div>}
                {/* <div className="date">{date}</div> */}
            </div>
        </div>
    )
}