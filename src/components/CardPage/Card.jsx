import { useState, useEffect } from 'react'
import axios from 'axios'
import './Card.css'

export default function Cards({deck}) {
    const [cards, setCard] = useState([]);

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
    console.log(cardsList);

    return (
        <div>
            <h2>{deck} Cards</h2>
            <div className="cards">
                {cardsList.length > 0 ? cardsList : <div>No Cards Found</div>}
            </div>
        </div>
    )
}

function FlashCard({title, front, back, date}) {
    const [ showBack, setShowBack ] = useState(false);

    function handleClick() {
        setShowBack(!showBack);
    }

    return (
        <div className="flashcard" onClick={handleClick}>
            <div>
                <div className="title">{title}</div>
                <div className="card-text">{showBack ? back : front}</div>
                <div className="date">{date}</div>
            </div>
        </div>
    )
}