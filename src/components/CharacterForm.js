import React, {useState} from 'react';

function CharacterForm({ addCharacter }) {
    const [newCharacter, setNewCharacter] = useState({
        name:'',
        lvl: '',
        class: '',
        race: ''
    });

    const handleChange = (e) => {
        setNewCharacter({ ...newCharacter, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addCharacter(newCharacter);
        setNewCharacter({name: '', lvl: '', class: '', race: ''});
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