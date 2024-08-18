import React from 'react'
import './Deck.css'

export default function Deck({title, onClick}) {

  return (
    <div className='deck-card' onClick={onClick}>
      <div className='deck-title'>{title}</div>
    </div>
  )
};
