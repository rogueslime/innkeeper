import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import CharacterCard from './CharacterCard';
import CharacterDetails from './CharacterDetails';
import './style/MyProfile.css';

function MyProfile() {
    const {currentUser, updateCurrentUser} = useAuth();

    const [characters, setCharacters] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [characterExpanded, setExpandedCharacter] = useState(null);

    const handleDeleteCharacter = () => {
        console.log('nut');
    };

    // Fans out the desired character.
    const handleExpandCharacter = (character) => {
        setExpandedCharacter(characterExpanded => character);
    }

    const handleUnexpandCharacter = () => {
        setExpandedCharacter(null);
    };

    // Fetches characters from database. Database must be online; currently not hooked into server.js
    useEffect(() => {
        const token = localStorage.getItem('token'); // getting the token from localStorage

        fetch(`http://localhost:4000/api/characters/${currentUser._id}?page=${currentPage}&limit=12`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                setCharacters(characters => data.characters)
                setTotalPages(totalPages => data.totalPages)
                console.log('Characters on next page fetched.')
            })
            .catch(error => console.error('Error fetching characters: ', error));
    }, [currentPage]);

    return (
        <>
        <p><strong>User ID: </strong>{currentUser.username}</p>
        <h1>Your Inn</h1>
        <div className = 'character-block'>
        <div className = 'user-characters'>
            {characters.map(character => (
                <CharacterCard key={character.id} 
                character={character} 
                onExpand={handleExpandCharacter} // Passing method as onExpand
                onDelete={handleDeleteCharacter}/> // Passing method as onDelete
            ))}
        </div>
        {characterExpanded && <CharacterDetails character = {characterExpanded} onUnexpand = {handleUnexpandCharacter}/>}
        </div>
        </>
    )
}

export default MyProfile;