import React from 'react';
import './style/CharacterCard.css';

function CharacterCard({ character, onExpand, onDelete }) { // Add the passed method onExpand as an arg to func
    return (
        <>
            <div className = 'character-card'>
                <h2>{character.name} // {character.lvl}</h2>
                <p>Class: {character.class}</p>
                <p>Race : {character.race}</p>
                <button onClick={() => onExpand(character)}>Expand</button>
                <button onClick={() => onDelete(character._id)}>Delete</button>
            </div>
        </>
    );
}

export default CharacterCard;