import React, {useState} from 'react';
import { useAuth } from '../context/AuthContext';
import './style/CharacterForm.css';

function CharacterForm({ addCharacter, isOpen }) {
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
        level: 0,
        class: '',
        race: '',
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
            setNewCharacter({name: '', class: '', race: '', level: '', HP_max: 0, ascores: [], features: [], spells: [], backpack: [], lorewriteup:''});

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
        <div className={`input-container ${isOpen ? 'open' : ''}`}>
            <form className="character-form" onSubmit={handleSubmit}>
            <h2>Character Submission</h2>

            <div className="form-row" id="fr-0">
                <div className = "labelPair">
                    <label for="name-input">Name</label>
                    <input
                        type="text"
                        className="name-input"
                        id="name-input"
                        name="name"
                        value={newCharacter.name}
                        onChange={handleChange}
                        placeholder="Name"
                        required
                    />
                </div>

                <div className = "labelPair">
                    <label for="race">Race</label>
                    <input
                        type="text"
                        name="race"
                        id="race"
                        value={newCharacter.race}
                        onChange={handleChange}
                        placeholder="Race"
                        required
                    />
                </div>
            </div>

            <div className = "form-row" id= "fr-1">
                <div className = "labelPair">
                    <label for="level">Level</label>
                    <input
                        type="number"
                        name="level"
                        id="level"
                        value={newCharacter.level}
                        onChange={handleChange}
                        placeholder="20"
                        required
                    />
                </div>

                <span></span>

                <div className = "labelPair">
                    <label for="class">Class</label>
                    <input
                        type="text"
                        name="class"
                        id="class"
                        value={newCharacter.class}
                        onChange={handleChange}
                        placeholder="Class"
                        required
                    />
                </div>

                <span></span>

                <div className = "labelPair">
                    <label for="HP_max">HP Max</label>
                    <input
                        type="number"
                        name="HP_max"
                        id="HP_max"
                        value={newCharacter.HP_max}
                        onChange={handleChange}
                        placeholder="Max HP"
                        required
                    />
                </div>

            </div>

            <div className = "labelPair">
                <label for="lore-writeup">Lore</label>
                <textarea
                    type="text"
                    className="lore-input"
                    id="lore-writeup"
                    name="lorewriteup"
                    value={newCharacter.lorewriteup}
                    onChange={handleChange}
                    placeholder="I'm just three goblins under a coat!"
                    required
                />
            </div>

            {/** -------------------------- */}
                    <p className= "formText">Ascore form</p>
                    <button type="button" className="add-btn" onClick={handleAddAscore}>Add Ability Score</button>
            {/** Form to handle Ascore inputs. */}
            <div className = "subform">

                    <div className ="form-row">
                    {myascores.map((ascore, index) => (
                        <>
                        <div className = "ascore" key = {index}>
                            <div className = "labelPair">
                                <label for="ascore-title">Title</label>
                                <input
                                    type="text"
                                    id="ascore-title"
                                    value={ascore.title}
                                    onChange={(e) => handleAscoreChange(index,'title',e.target.value)}
                                    placeholder="CON"
                                />
                            </div>

                            <div className = "labelPair">
                                <label for="ascore-score">Score</label>
                                <select
                                    type="number"
                                    id="ascore-score"
                                    value={ascore.score}
                                    onChange={(e) => handleAscoreChange(index, 'score', e.target.value)}
                                    placeholder="0"
                                >
                                    <option>1</option> {/**doesnt work */}
                                </select>
                            </div>

                            <button type="button" onClick={() => handleRemoveAscore(index)}>Remove</button>
                        </div>
                        <span></span>
                        </>
                    ))}
                
            </div>
            </div>
            {/** Form to handle feat inputs. */}
                    <p className = "formText">Feat Form</p>
                    <button type="button" className="add-btn" onClick={handleAddFeat}>Add Feature</button>
            <div className = "subform">
                
                    <div className = "form-row">
                    {myfeats.map((feat, index) => (
                        <>
                        <div className = 'feat'>

                            <div className = "labelPair">
                                <label for="feat-title">Title</label>
                                <input
                                    type="text"
                                    name="featTitle"
                                    id="feat-title"
                                    value={feat.title}
                                    onChange={(e) => handleFeatChange(index,'title',e.target.value)}
                                    placeholder="Title"
                                    required
                                />
                            </div>

                            <div className = "labelPair">
                            <label for="feat-body">Description</label>
                                <input
                                    type="text"
                                    name="feat-body"
                                    value={feat.body}
                                    onChange={(e) => handleFeatChange(index,'body',e.target.value)}
                                    placeholder="Body"
                                    required
                                />
                            </div>

                            <button type="button" onClick={() => handleRemoveFeat(index)}>Remove</button>
                        </div>
                        <span></span>
                        </>
                    ))}
                </div>
            </div>
            {/** Form to handle spell inputs. */}
                    <p className = "formText">Spell Form</p>
                    <button type="button" className="add-btn" onClick={handleAddSpell}>Add Spell</button>
            <label for = "spellform">
            <div className = "subform">
                
                    <div className="form-row">
                    {myspells.map((spell, index) => (
                        <>
                        <div className = "spell">
                            
                            <div className = "labelPair">
                                <label for="spell-title">Title</label>
                                <input
                                    type="text"
                                    name="spellTitle"
                                    id="spell-title"
                                    value={spell.title}
                                    onChange={(e) => handleSpellChange(index, 'title',e.target.value)}
                                    placeholder="Fireball"
                                    required
                                />
                            </div>

                            <div className = "labelPair">
                                <label for="spell-level">Level</label>
                                <input
                                    type="int"
                                    name="spellLevel"
                                    id="spell-level"
                                    value={spell.level}
                                    onChange={(e) => handleSpellChange(index,'level',e.target.value)}
                                    placeholder="1"
                                    required
                                />
                            </div>

                            <div className = "labelPair">
                                <label for="spell-body">Description</label>
                                <input
                                    type="int"
                                    name="spellBody"
                                    id="spell-body"
                                    value={spell.body}
                                    onChange={(e) => handleSpellChange(index,'body',e.target.value)}
                                    placeholder="A fiery ball!"
                                    required
                                />
                            </div>

                            <button type="button" onClick={() => handleRemoveSpell(index)}>Remove</button>
                        </div>
                        <span></span>
                        </>
                    ))}
                </div>
            </div>
            </label>
                <p className="formText">Item Form</p>
                <button type="button" className="add-btn" onClick={handleAddItem}>Add Item</button>
            {/** Form to handle item inputs. */}
            <div className = "subform">
                
                <div className = "form-row">
                    {myitems.map((item, index) => (
                        <>
                        <div className = "item">

                            <div className = "labelPair">
                                <label for="item-title">Title</label>
                                <input
                                    type="text"
                                    name="itemTitle"
                                    id="item-title"
                                    value={item.title}
                                    onChange={(e) => handleItemChange(index, 'title',e.target.value)}
                                    placeholder="Stick"
                                    required
                                />
                            </div>

                            <div className = "labelPair">
                                <label for="item-weight">Weight</label>
                                <input
                                    type="double"
                                    name="itemWeight"
                                    id="item-weight"
                                    value={item.weight}
                                    onChange={(e) => handleItemChange(index,'weight',e.target.value)}
                                    placeholder="0.0"
                                    required
                                />
                            </div>

                            <div className = "labelPair">
                            <label for="item-worth">Worth</label>
                            <input
                                type="text"
                                name="itemWorth"
                                id="item-worth"
                                value={item.body}
                                onChange={(e) => handleItemChange(index, 'body', e.target.value)}
                                placeholder="1 gold"
                                required
                            />
                            </div>

                            <button type="button" onClick={() => handleRemoveItem(index)}>Remove</button>
                        </div>
                        <span></span>
                        </>
                    ))}
                </div>
            </div>
            {/** -------------------------- */}
            <p className = "formText"></p>
            <button className="submit-character-button" type ="submit"> Submit your character! </button>
            </form>
        </div>
    )
}

export default CharacterForm;