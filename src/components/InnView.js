import React, { useState, useEffect } from 'react';
import CharacterCard from './CharacterCard';
import CharacterForm from './CharacterForm';
import CharacterDetails from './CharacterDetails'
import './style/InnView.css'

function InnView() {
    const [characters, setCharacters] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const [expandedCharacter, setExpandedCharacter] = useState(null);

    const handleExpandCharacter = (character) => {
        setExpandedCharacter(character);
    }

    // Fetches characters from database. Database must be online; currently not hooked into server.js
    useEffect(() => {
        fetch(`http://localhost:4000/api/characters?page=${currentPage}&limit=4`)
            .then(response => response.json())
            .then(data => {
                setCharacters(data.characters)
                setTotalPages(data.totalPages)
                console.log('Characters on next page fetched.')
            })
            .catch(error => console.error('Error fetching characters: ', error));
    }, [currentPage]);

    const addCharacter = (character) => {
        setCharacters([...characters, { ...character, id: characters.length + 1 }]);
    };

    const handleNext = () => {
        setCurrentPage(currentPage => currentPage + 1);
    };

    const handlePrevious = () => {
        setCurrentPage(currentPage => Math.max(1, currentPage - 1)); // prevents going below 1.
    };


    return (
        <>
            <CharacterForm addCharacter={addCharacter} />
            <div className="innview">
                {characters.map(character => (
                    <CharacterCard key={character.id} 
                    character={character} 
                    onExpand={handleExpandCharacter}/> // Passing method as onExpand
                ))}
            </div>
            <button onClick={handlePrevious} disabled={currentPage === 1}>Previous</button>
            <button onClick={handleNext} disabled={currentPage === totalPages}>Next</button>
            <div className = 'expanded'>{expandedCharacter && <CharacterDetails character = {expandedCharacter} />}</div>
        </>
    );
}

export default InnView;
