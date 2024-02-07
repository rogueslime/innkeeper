import React from 'react';

function CharacterCard({ character }) {
    return (
        <>
            <style>
                {`
                .character-card {
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    padding: 20px;
                    margin: 10px;
                    width: 300px; /* Fixed width */
                    height: auto; /* Automatic height, but you can set a fixed height if preferred */
                    background-color: #f9f9f9;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }
                
                .character-card h2, .character-card h3 {
                    margin-top: 0;
                    color: #333;
                }
                
                .character-card ul {
                    list-style-type: none;
                    padding: 0;
                }
                
                .character-card li {
                    border-bottom: 1px solid #eee;
                    padding: 5px 0;
                }
                
                .character-card p {
                    color: #666;
                }
                `}
            </style>

            <div className = 'character-card'>
                <h2>{character.name} // {character.lvl}</h2>
                <p>Class: {character.class}</p>
                <p>Race : {character.race}</p>
                {character.ascores ? ( // If character has ascores...
                    <ul>
                        {character.ascores.map((score, index) => (
                            <li key={index}>{score.title} - {score.score}</li>
                        ))}
                    </ul>
                    ) : ( // If else ...
                    <p>no ascores available</p>
                )}
                {character.features ? ( // If character has ascores...
                    <ul>
                        {character.features.map((feat, index) => (
                            <li key={index}>{feat.title} - {feat.body}</li>
                        ))}
                    </ul>
                    ) : ( // If else ...
                    <p>no feats available</p>
                )}
                {character.spells ? ( // If character has ascores...
                    <ul>
                        {character.spells.map((spell, index) => (
                            <li key={index}>{spell.title} / {spell.level} - {spell.body}</li>
                        ))}
                    </ul>
                    ) : ( // If else ...
                    <p>no spells available</p>
                )}
                {character.backpack ? ( // If character has ascores...
                    <ul>
                        {character.backpack.map((item, index) => (
                            <li key={index}>{item.title} // {item.weight} // {item.worth} - {item.body}</li>
                        ))}
                    </ul>
                    ) : ( // If else ...
                    <p>no items available</p>
                )}
            </div>
        </>
    );
}

export default CharacterCard;