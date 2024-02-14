import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import CharacterCard from './CharacterCard';
import CharacterForm from './CharacterForm';
import CharacterDetails from './CharacterDetails'
import './style/InnView.css'

function InnView() {
    const { currentUser } = useAuth();

    const [characters, setCharacters] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const [expandedCharacter, setExpandedCharacter] = useState(null);
    const [isCharacterFormOpen, setIsCharacterFormOpen] = useState(false);
    
    // Unexpand the fanned out character menu.
    const handleUnexpandCharacter = () => {
        setExpandedCharacter(null);
    };

    // Fans out the desired character.
    const handleExpandCharacter = (character) => {
        setExpandedCharacter(character);
    }

    // Deletes a character, including a confirmation window.
    const handleDeleteCharacter = (characterId) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this character?');
        console.log(characterId);

        if (isConfirmed) {
            fetch(`http://localhost:4000/api/characters/${characterId}`, {
                method: 'DELETE',
            })
            .then(response =>{
                if(!response.ok) {
                    throw new Error('failed to delete character.',characterId);
                }
                return response.json();
            })
            .then(() => {
                // Update state to remove the character from the UI. However, Character currently remains in UI after deletion until a
                // different state update occurs.
                setCharacters(characters => characters.filter(character => character._id !== characterId));
            })
            .catch(error => {
                console.error('Error deleting character:', error);
            });
        }
    };

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

    // Adds a character based on the input.
    const addCharacter = (character) => {
        setCharacters(prevCharacters => [...prevCharacters, { ...character, id: characters.length + 1 }]);
    };

    // Next page.
    const handleNext = () => {
        setCurrentPage(currentPage => currentPage + 1);
    };

    // Previous page.
    const handlePrevious = () => {
        setCurrentPage(currentPage => Math.max(1, currentPage - 1)); // prevents going below 1.
    };


    return (
        <>
        
            {/*If currentUser, allow access to Add Character form*/}
            { currentUser ? (
                <CharacterForm addCharacter={addCharacter} isOpen={isCharacterFormOpen} />
            ) : (
                <></>
            )}

            
            {/*Innview block*/}
            <div className="innview">
                {characters.map(character => (
                    <CharacterCard key={character.id} 
                    character={character} 
                    onExpand={handleExpandCharacter} // Passing method as onExpand
                    onDelete={handleDeleteCharacter}/> // Passing method as onDelete
                ))}
            </div>

        
            {/*Nav Buttons*/}
            <div className = 'navButtons'>
                {/** A button to manage whether or not the character creator is open. */}
                <button className="cformbutton" onClick = {() => setIsCharacterFormOpen(prev => !prev)}>
                    {isCharacterFormOpen ? 'Close Form' : 'Open Form'}
                </button>
                <button name = 'nav' onClick={handlePrevious} disabled={currentPage === 1}>Previous</button>
                <button name = 'nav' onClick={handleNext} disabled={currentPage === totalPages}>Next</button>
            </div>

            
            {/*ExpandedCharacter block*/}
            {expandedCharacter && <CharacterDetails character = {expandedCharacter} onUnexpand = {handleUnexpandCharacter} />}
        </>
    );
}

export default InnView;
