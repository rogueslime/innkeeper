import React, { useState } from 'react';
import CharacterCard from './CharacterCard';
import CharacterForm from './CharacterForm';

function InnView() {
    const [characters, setCharacters] = useState([
        {
            id: 1,
            name: 'Elrond',
            class: 'Wizard',
            race: 'Elf',
            lvl: 5
        },
        {
            id: 2,
            name: 'Bobbert',
            class: 'Fighter',
            race: 'Halfling',
            lvl: 3
        }
    ]);

    const addCharacter = (character) => {
        setCharacters([...characters, { ...character, id: characters.length + 1 }]);
    };


    return (
        <>
            <style>
                {`
            .character-container {
              display: flex;
              flex-direction: row;
              justify-content: center; /* Center the items horizontally */
              align-items: center; /* Center the items vertically (optional) */
            }
            .character-container > div { /* Assuming CharacterCard is a div */
              margin: 10px; /* Add some space between cards */
              outline-style: dotted;
            }
          `}
            </style>

            <CharacterForm addCharacter={addCharacter} />
            <div className="character-container">
                {characters.map(character => (
                    <CharacterCard key={character.id} character={character} />
                ))}
            </div>
        </>
    );
}

export default InnView;
