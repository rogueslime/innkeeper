import React, { useState, useEffect } from 'react';
import CharacterCard from './CharacterCard';
import CharacterForm from './CharacterForm';
import CharacterDetails from './CharacterDetails'

function InnView() {
    const [characters, setCharacters] = useState([
        {}
    ]);
    const [expandedCharacter, setExpandedCharacter] = useState(null);

    const handleExpandCharacter = (character) => {
        setExpandedCharacter(character);
    }

    // Fetches characters from database. Database must be online; currently not hooked into server.js
    useEffect(() => {
        fetch('http://localhost:4000/api/characters')
            .then(response => response.json())
            .then(data => setCharacters(data))
            .then(data => console.log(data))
            .catch(error => console.error('Error fetching characters: ', error));
    }, []);

    const addCharacter = (character) => {
        setCharacters([...characters, { ...character, id: characters.length + 1 }]);
    };


    return (
        <>
            <CharacterForm addCharacter={addCharacter} />
            <div className="character-container">
                {characters.map(character => (
                    <CharacterCard key={character.id} 
                    character={character} 
                    onExpand={handleExpandCharacter}/> // Passing method as onExpand
                ))}
            </div>
            {expandedCharacter && <CharacterDetails character = {expandedCharacter} />}
        </>
    );
}

export default InnView;
