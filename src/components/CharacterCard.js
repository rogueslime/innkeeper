import React from 'react';
import './style/CharacterCard.css';
import {useAuth} from '../context/AuthContext';

function CharacterCard({ character, onExpand, onDelete }) { // Add the passed method onExpand as an arg to func
    const { currentUser } = useAuth();
    const canDelete = currentUser && currentUser.characterList && currentUser.characterList.includes(character._id);

    return (
        <>
            <div className = 'character-card'>
                <h2>{character.name} // {character.level}</h2>
                <p>Class: {character.class}</p>
                <p>Race : {character.race}</p>
                <button onClick={() => onExpand(character)}>Expand</button>
                {canDelete && <button onClick={() => onDelete(character._id)}>Delete</button>}
            </div>
        </>
    );
}

export default CharacterCard;