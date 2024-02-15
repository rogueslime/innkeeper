import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import CharacterCard from './CharacterCard';

function MyProfile() {
    const {currentUser, updateCurrentUser} = useAuth();

    const [characters, setCharacters] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const handleDeleteCharacter = () => {
        console.log('nut');
    };

    // Fans out the desired character.
    const handleExpandCharacter = (character) => {
        console.log('nut');
    }
    
    console.log(`http://localhost:4000/api/characters/${currentUser._id}?page=${currentPage}&limit=4`)

    // Fetches characters from database. Database must be online; currently not hooked into server.js
    useEffect(() => {
        fetch(`http://localhost:4000/api/characters/${currentUser._id}?page=${currentPage}&limit=4`)
            .then(response => response.json())
            .then(data => {
                setCharacters(data.characters)
                setTotalPages(data.totalPages)
                console.log('Characters on next page fetched.')
            })
            .catch(error => console.error('Error fetching characters: ', error));
    }, [currentPage]);

    return (
        <>
        <p>{currentUser.username}</p>
       

        {characters.map(character => (
            <CharacterCard key={character.id} 
            character={character} 
            onExpand={handleExpandCharacter} // Passing method as onExpand
            onDelete={handleDeleteCharacter}/> // Passing method as onDelete
        ))}
        </>
    )
}

export default MyProfile;