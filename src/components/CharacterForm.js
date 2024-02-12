import React, {useState} from 'react';
import { useAuth } from '../context/AuthContext';

function CharacterForm({ addCharacter }) {
    const { currentUser, updateCurrentUser } = useAuth();

    const [newCharacter, setNewCharacter] = useState({
        name:'',
        lvl: '',
        class: '',
        race: ''
    });

    const handleChange = (e) => {
        setNewCharacter({ ...newCharacter, [e.target.name]: e.target.value});
    };

    //const handleSubmit = (e) => {
    //    e.preventDefault();
    //    addCharacter(newCharacter);
    //    setNewCharacter({name: '', lvl: '', class: '', race: ''});
    //};


    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        if(!token) {
            console.error('No token found, please log in.');
            return;
        }
    
        try {
            const response = await fetch('http://localhost:4000/api/characters', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(newCharacter),
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const result = await response.json();
            console.log('Success:', result);
    
            // Optionally, clear the form here if submission was successful
            setNewCharacter({name: '', lvl: '', class: '', race: ''});

            // Updated currentUser context to grab new added character
            const updatedCharacterList = [...currentUser.characterList, result._id];
            const updatedUser = {...currentUser, characterList: updatedCharacterList};
            updateCurrentUser(updatedUser);

            // Update state of InnView component
            addCharacter(result);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                value={newCharacter.name}
                onChange={handleChange}
                placeholder="Name"
                required
            />
            <input
                type="number"
                name="lvl"
                value={newCharacter.lvl}
                onChange={handleChange}
                placeholder="Level"
                required
            />
            <input
                type="text"
                name="class"
                value={newCharacter.class}
                onChange={handleChange}
                placeholder="Class"
                required
            />
            <input
                type="text"
                name="race"
                value={newCharacter.race}
                onChange={handleChange}
                placeholder="Race"
                required
            />
            <button type ="submit"> Submit your character! </button>
        </form>
    )
}

export default CharacterForm;