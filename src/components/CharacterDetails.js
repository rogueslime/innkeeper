import React from 'react';
import './style/CharacterDetails.css';

function CharacterDetails({character, onUnexpand}) { // Create method to expand element arrays so this file isn't as long
    return (
        <div className = 'expanded'>
            
            <button onClick = {() => onUnexpand()}>Unexpand</button>

            <ul><h1>{character.name}</h1></ul>
            <div className = 'lore'>
                {character.lorewriteup ? (
                    <ul><p>{character.lorewriteup}</p></ul>
                ) : (
                    <p>no lore available</p>
                )}
            </div>
            <div className = 'ascores'>
                {character.ascores ? ( // If character has ascores...
                    <ul>
                        {character.ascores.map((score, index) => (
                            <li key={index}><p><b>{score.title} : </b>{score.score}</p></li>
                        ))}
                    </ul>
                    ) : ( // If else ...
                    <p>no ascores available</p>
                )}
            </div>
            <div className = 'feats'>
                {character.features ? ( // If character has feats...
                    <ul>
                        {character.features.map((feat, index) => (
                            <li key={index}>{feat.title} - {feat.body}</li>
                        ))}
                    </ul>
                    ) : ( // If else ...
                    <p>no feats available</p>
                )}
            </div>
            <div className = 'spells'>
                {character.spells ? ( // If character has spells...
                    <ul>
                        {character.spells.map((spell, index) => (
                            <li key={index}>{spell.title} / {spell.level} - {spell.body}</li>
                        ))}
                    </ul>
                    ) : ( // If else ...
                    <p>no spells available</p>
                )}
            </div>
            <div className = 'backpack'>
                {character.backpack ? ( // If character has items...
                    <ul>
                        {character.backpack.map((item, index) => (
                            <li key={index}>{item.title} // {item.weight} // {item.worth} - {item.body}</li>
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