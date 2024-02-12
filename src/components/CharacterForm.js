import React, {useState} from 'react';
import { useAuth } from '../context/AuthContext';
import './style/CharacterForm.css';

function CharacterForm({ addCharacter }) {
    const { currentUser, updateCurrentUser } = useAuth();

    // States to hold feats, spells, and items for character submission process
    const { currentFeatArray, setCurrentFeatArray } = useState([]);
    const { currentSpellArray, setCurrentSpellArray } = useState([]);
    const { currentItemArray, setCurrentItemArray } = useState([]);

    const [newCharacter, setNewCharacter] = useState({
        name:'',
        class: '',
        race: '',
        lvl: '',
        HP_max: 0,
        ascores: [],
        spells: [],
        backpack: [],
        lorewriteup: '',
    });

    // Inputs for character Ascores
    const inputAscore = {
        title:'',
        score:0
    }

    // Inputs for character Ascores
    const inputFeat = {
        title:'',
        score:0
    }

    // Inputs for character spells
    const inputSpell = {
        title:'',
        level:0,
        body:''
    }

    // Inputs for character items
    const inputItem = {
        title:'',
        weight:0.0,
        worth:'',
        body:''
    }

    const handleChange = (e) => {
        setNewCharacter({ ...newCharacter, [e.target.name]: e.target.value});
    };


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
            setNewCharacter({name: '', class: '', race: '', lvl: '', HP_max: 0, ascores: [], features: [], spells: [], backpack: [], lorewriteup:''});

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
        <div className ="fullform">
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
            <input
                type="int"
                name="HP_max"
                value={newCharacter.HP_max}
                onChange={handleChange}
                placeholder="0"
                required
            />

            {/** -------------------------- */}
            {/** Form to handle Ascore inputs. */}
            <div className = "ascoreform">
            <form>
                <p>Ascore Form</p>
                <input
                    type="text"
                    name="ascoreTitle"
                    value={inputAscore.title}
                    onChange={handleChange}
                    placeholder="CON"
                    required
                />
                <input
                    type="int"
                    name="ascoreVal"
                    value={inputAscore.score}
                    onChange={handleChange}
                    placeholder="0"
                    required
                />
            </form>
            </div>
            {/** Form to handle feat inputs. */}
            <div className = "featform">
            <form>
                <p>Feat Form</p>
                 <input
                    type="text"
                    name="featTitle"
                    value={inputFeat.title}
                    onChange={handleChange}
                    placeholder="Title"
                    required
                />
                <input
                    type="text"
                    name="featBody"
                    value={inputFeat.body}
                    onChange={handleChange}
                    placeholder="Body"
                    required
                />
            </form>
            </div>
            {/** Form to handle spell inputs. */}
            <div className = "spellform">
            <form>
                <p>Spell Form</p>
                <input
                    type="text"
                    name="spellTitle"
                    value={inputSpell.title}
                    onChange={handleChange}
                    placeholder="Fireball"
                    required
                />
                <input
                    type="int"
                    name="spellLevel"
                    value={inputSpell.level}
                    onChange={handleChange}
                    placeholder="1"
                    required
                />
                <input
                    type="int"
                    name="spellBody"
                    value={inputSpell.body}
                    onChange={handleChange}
                    placeholder="A fiery ball!"
                    required
                />
            </form>
            </div>
            {/** Form to handle item inputs. */}
            <div className = "itemform">
            <form>
                <p>Item Form</p>
                <input
                    type="text"
                    name="itemTitle"
                    value={inputItem.title}
                    onChange={handleChange}
                    placeholder="Stick"
                    required
                />
                <input
                    type="double"
                    name="itemWeight"
                    value={inputItem.weight}
                    onChange={handleChange}
                    placeholder="0.0"
                    required
                />
                <input
                    type="text"
                    name="itemWorth"
                    value={inputItem.body}
                    onChange={handleChange}
                    placeholder="1 gold"
                    required
                />
            </form>
            </div>
            {/** -------------------------- */}

            <input
                type="text"
                name="lorewriteup"
                value={newCharacter.lorewriteup}
                onChange={handleChange}
                placeholder="Lore Writeup"
                required
            />
            <button type ="submit"> Submit your character! </button>
        </form>
        </div>
    )
}

export default CharacterForm;