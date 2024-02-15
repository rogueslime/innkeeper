import React from 'react';
import './style/CharacterDetails.css';

function CharacterDetails({character, onUnexpand}) { // Create method to expand element arrays so this file isn't as long
    return (
        <div className = 'expanded'>
            
            <button onClick = {() => onUnexpand()}>Unexpand</button>

            <ul><h1>{character.name}</h1></ul>
            <span></span>
            <div className = 'lore'>
                {character.lorewriteup ? (
                    <ul><p>{character.lorewriteup}</p></ul>
                ) : (
                    <p>no lore available</p>
                )}
            </div>
            <span></span>
            <div>
                {character.ascores ? ( // If character has ascores...
                    <ul className = 'ascores'>
                        {character.ascores.map((score, index) => (
                            <li id = 'ascore' key={index}><p><b>{score.title}</b></p><p>{score.score}</p></li>
                        ))}
                    </ul>
                    ) : ( // If else ...
                    <p>no ascores available</p>
                )}
            </div>
            <span></span>
            <div>
                {character.features ? ( // If character has feats...
                    <ul  className = 'feats'>
                        {character.features.map((feat, index) => (
                            <li key={index}><p>{feat.title}</p><p className = 'card-body'>{feat.body}</p></li>
                        ))}
                    </ul>
                    ) : ( // If else ...
                    <p>no feats available</p>
                )}
            </div>
            <span></span>
            <div>
                {character.spells ? ( // If character has spells...
                    <ul  className = 'spells'>
                        {character.spells.map((spell, index) => (
                            <li key={index}><p><b>{spell.title} / {spell.level}</b></p><p className = 'card-body'>{spell.body}</p></li>
                        ))}
                    </ul>
                    ) : ( // If else ...
                    <p>no spells available</p>
                )}
            </div>
            <span></span>
            <div>
                {character.backpack ? ( // If character has items...
                    <ul  className = 'backpack'>
                        {character.backpack.map((item, index) => (
                            <li key={index}><p><b>{item.title}</b>// {item.weight} // {item.worth}</p><p className = 'card-body'>{item.body}</p></li>
                        ))}
                    </ul>
                    ) : ( // If else ...
                    <p>no items available</p>
                )}
            </div>
        </div>
    )
}

export default CharacterDetails;