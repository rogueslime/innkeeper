import React from 'react';

function CharacterCard({ character }) {
    return (
        <>
            <style>
                {`
                .charactercard {
                    display: flex;
                    flex-direction: column;
                    justify-content: center; /* Center the items horizontally */
                    align-items: center; /* Center the items vertically (optional) */
                `}
            </style>

            <div className = 'charactercard'>
                <h2>{character.name} // {character.lvl}</h2>
                <p>Class: {character.class}</p>
                <p>Race : {character.race}</p>
            </div>
        </>
    );
}

export default CharacterCard;