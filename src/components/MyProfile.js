import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import CharacterCard from './CharacterCard';
import CharacterDetails from './CharacterDetails';
import './style/MyProfile.css';

function MyProfile() {
    const {currentUser, updateCurrentUser } = useAuth();

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

    // Resend verification email endpoint
    const resendVerification = () => {
        const token = localStorage.getItem('token');
        console.log('token retrieved');

        fetch(`http://localhost:4000/api/auth/reverify`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        .then(response => {
            if(response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to reverify');
            }
        })
        .then(data => console.log(data.message))
        .catch(error => console.error('Error reverifying ',error))
    }

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
        <div className = 'profile-details'>
            <p><strong>User ID: </strong>{currentUser.username}</p>
            <p><strong>User E-mail:</strong> {currentUser.email} {currentUser.tokenVerified ? (<strong>V</strong>) : (<strong onClick={resendVerification}>NV: Resend</strong>)}</p>
            <p><strong>Change Email</strong></p> {/** Need to finish change email route hookup. */}
        </div>
        <h1>Your Inn</h1>
        <div className = 'character-block'>
            <div className = 'details-block'>
                <CharacterDetails character = {characterExpanded} onUnexpand = {handleUnexpandCharacter}/>
            </div>
            <span></span>
            <div className = 'user-characters'>
                {Array.isArray(characters) && characters.length > 0 &&characters.map(character => (
                    <CharacterCard key={character.id} 
                    character={character} 
                    onExpand={handleExpandCharacter} // Passing method as onExpand
                    onDelete={handleDeleteCharacter}/> // Passing method as onDelete
                ))}
            </div>
        </div>
        </>
    )
}

export default MyProfile;