import React, {useState} from 'react';
import { useAuth } from '../context/AuthContext';
import './style/CharacterForm.css';

function CharacterForm({ addCharacter }) {
    const { currentUser, updateCurrentUser } = useAuth();

    // States to hold feats, spells, and items for character submission process
    const [myascores, setAscores] = useState([]);
    const [myfeats, setFeats] = useState([]);
    const [myspells, setSpells] = useState([]);
    const [myitems, setItems] = useState([]);

    // Change handlers for the above
    // Ascores
    const handleAddAscore = () => {
        setAscores(myascores => ([...myascores, {title:'',score:0}]));
    };
    const handleRemoveAscore = (index) => {
        setAscores(myascores => (myascores.filter((_,i) => i !== index)));
    };
    // Maps through ascores whenever we change a Feat's properties in our Feat form. Looks for the index of the changed feat,
    // returning objects unchanged until the index is found. Once found, it returns a spread of the object, updating the specified 
    // Field with the specified Value.
    const handleAscoreChange = (index, field, value) => {
        const newAscores = myascores.map((ascore, i) => {
            if(i === index) {
                return {...ascore,[field]:value};
            }
            return ascore;
        });
        setAscores(myascores => newAscores);
    }

    // Feats
    const handleAddFeat = () => {
        setFeats(myfeats => ([...myfeats, {title:'',body:''}]));
    }
    const handleRemoveFeat = (index) => {
        setFeats(myfeats => (myfeats.filter((_,i)=> i !== index)));
    }
    const handleFeatChange = (index, field, value) => {
        const newFeats = myfeats.map((feat, i) => {
            if(i === index) {
                return{...feat,[field]:value};
            }
            return feat;
        });
        setFeats(myfeats => newFeats);
    }

    // Spells
    const handleAddSpell = () => {
        setSpells(myspells => ([...myspells, {title:'',level:0,body:''}]));
    }
    const handleRemoveSpell = (index) => {
        setSpells(myspells => (myspells.filter((_,i) => i !== index)));
    }
    const handleSpellChange = (index, field, value) => {
        const newSpells = myspells.map((spell, i) => {
            if(i === index) {
                return{...spell,[field]:value};
            }
            return spell;
        });
        setSpells(myspells => newSpells);
    }

    // Items
    const handleAddItem = () => {
        setItems(myitems => ([...myitems,{title:'',weight:0,worth:'',body:''}]));
    }
    const handleRemoveItem = (index) => {
        setItems(myitems => (myitems.filter((_,i) => i !== index)));
    }
    const handleItemChange = (index, field, value) => {
        const newItems = myitems.map((item, i) => {
            if(i === index) {
                return {...item,[field]:value};
            }
            return item;
        });
        setItems(myitems => newItems);
    }

    const [newCharacter, setNewCharacter] = useState({
        name:'',
        class: '',
        race: '',
        lvl: '',
        HP_max: 0,
        ascores: [],
        features: [],
        spells: [],
        backpack: [],
        lorewriteup: '',
    });

    const handleChange = (e) => {
        setNewCharacter(newCharacter => ({ ...newCharacter, [e.target.name]: e.target.value}));
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
                body: JSON.stringify({...newCharacter, ascores: myascores, features: myfeats, spells: myspells, backpack: myitems}),
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
        <form className="character-form" onSubmit={handleSubmit}>
            <div className="input-container">
            <input
                type="text"
                className="name-input"
                name="name"
                value={newCharacter.name}
                onChange={handleChange}
                placeholder="Name"
                required
            />
            <label for ="lvl-class-HPmax">
            <div className = "form-row">
                <input
                    type="number"
                    name="lvl"
                    value={newCharacter.lvl}
                    onChange={handleChange}
                    placeholder="Level"
                    required
                />
                <span></span>
                <input
                    type="text"
                    name="class"
                    value={newCharacter.class}
                    onChange={handleChange}
                    placeholder="Class"
                    required
                />
                <span></span>
                <input
                    type="int"
                    name="HP_max"
                    value={newCharacter.HP_max}
                    onChange={handleChange}
                    placeholder="Max HP"
                    required
                />
            </div>
            </label>

            <input
                type="text"
                name="race"
                value={newCharacter.race}
                onChange={handleChange}
                placeholder="Race"
                required
            />

            {/** -------------------------- */}
            {/** Form to handle Ascore inputs. */}
            <div className = "form-row">
                
                    <p>Ascore Form</p>
                    {myascores.map((ascore, index) => (
                        <div className = "ascore" key = {index}>
                            <input
                                type="text"
                                value={ascore.title}
                                onChange={(e) => handleAscoreChange(index,'title',e.target.value)}
                                placeholder="CON"
                            />
                            <span></span>
                            <input
                                type="number"
                                value={ascore.score}
                                onChange={(e) => handleAscoreChange(index, 'score', e.target.value)}
                                placeholder="0"
                            />
                            <button type="button" onClick={() => handleRemoveAscore(index)}>Remove</button>
                        </div>
                    ))};
                    <button type="button" onClick={handleAddAscore}>Add Ability Score</button>
                
            </div>
            {/** Form to handle feat inputs. */}
            <div className = "form-row">
                
                    <p>Feat Form</p>
                    {myfeats.map((feat, index) => (
                        <div className = 'feat'>
                            <input
                                type="text"
                                name="featTitle"
                                value={feat.title}
                                onChange={(e) => handleFeatChange(index,'title',e.target.value)}
                                placeholder="Title"
                                required
                            />
                            <span></span>
                            <input
                                type="text"
                                name="featBody"
                                value={feat.body}
                                onChange={(e) => handleFeatChange(index,'body',e.target.value)}
                                placeholder="Body"
                                required
                            />
                            <button type="button" onClick={() => handleRemoveFeat(index)}>Remove</button>
                        </div>
                    ))};
                    <button type="button" onClick={handleAddFeat}>Add Feat</button>

            </div>
            {/** Form to handle spell inputs. */}
            <label for = "spellform">
            <div className = "form-row">
                
                    <p>Spell Form</p>
                    {myspells.map((spell, index) => (
                        <div className = "spell">
                            <input
                                type="text"
                                name="spellTitle"
                                value={spell.title}
                                onChange={(e) => handleSpellChange(index, 'title',e.target.value)}
                                placeholder="Fireball"
                                required
                            />
                            <span></span>
                            <input
                                type="int"
                                name="spellLevel"
                                value={spell.level}
                                onChange={(e) => handleSpellChange(index,'level',e.target.value)}
                                placeholder="1"
                                required
                            />
                            <span></span>
                            <input
                                type="int"
                                name="spellBody"
                                value={spell.body}
                                onChange={(e) => handleSpellChange(index,'body',e.target.value)}
                                placeholder="A fiery ball!"
                                required
                            />
                            <button type="button" onClick={() => handleRemoveSpell(index)}>Remove</button>
                        </div>
                    ))};
                    <button type="button" onClick={handleAddSpell}>Add Spell</button>
                
            </div>
            </label>
            {/** Form to handle item inputs. */}
            <div className = "form-row">
                
                <p>Item Form</p>
                    {myitems.map((item, index) => (
                        <div className = "item">
                            <input
                                type="text"
                                name="itemTitle"
                                value={item.title}
                                onChange={(e) => handleItemChange(index, 'title',e.target.value)}
                                placeholder="Stick"
                                required
                            />
                            <span></span>
                            <input
                                type="double"
                                name="itemWeight"
                                value={item.weight}
                                onChange={(e) => handleItemChange(index,'weight',e.target.value)}
                                placeholder="0.0"
                                required
                            />
                            <span></span>
                            <input
                                type="text"
                                name="itemWorth"
                                value={item.body}
                                onChange={(e) => handleItemChange(index, 'body', e.target.value)}
                                placeholder="1 gold"
                                required
                            />
                            <button type="button" onClick={() => handleRemoveItem(index)}>Remove</button>
                        </div>
                    ))};
                    <button type="button" onClick={handleAddItem}>Add Item</button>

            </div>
            {/** -------------------------- */}

            <textarea
                type="text"
                className="lore-input"
                name="lorewriteup"
                value={newCharacter.lorewriteup}
                onChange={handleChange}
                placeholder="Lore Writeup"
                required
            />
            <button type ="submit"> Submit your character! </button>
            </div>
        </form>
    )
}

export default CharacterForm;