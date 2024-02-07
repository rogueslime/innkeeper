import React from 'react';

function CharacterDetails({character}) { // Create method to expand element arrays so this file isn't as long
    return (
        <>
            {character.name}
            {character.ascores ? ( // If character has ascores...
                    <ul>
                        {character.ascores.map((score, index) => (
                            <li key={index}>{score.title} - {score.score}</li>
                        ))}
                    </ul>
                    ) : ( // If else ...
                    <p>no ascores available</p>
                )}
                {character.features ? ( // If character has feats...
                    <ul>
                        {character.features.map((feat, index) => (
                            <li key={index}>{feat.title} - {feat.body}</li>
                        ))}
                    </ul>
                    ) : ( // If else ...
                    <p>no feats available</p>
                )}
                {character.spells ? ( // If character has spells...
                    <ul>
                        {character.spells.map((spell, index) => (
                            <li key={index}>{spell.title} / {spell.level} - {spell.body}</li>
                        ))}
                    </ul>
                    ) : ( // If else ...
                    <p>no spells available</p>
                )}
                {character.backpack ? ( // If character has items...
                    <ul>
                        {character.backpack.map((item, index) => (
                            <li key={index}>{item.title} // {item.weight} // {item.worth} - {item.body}</li>
                        ))}
                    </ul>
                    ) : ( // If else ...
                    <p>no items available</p>
                )}
                {character.lorewriteup ? (
                    <p>{character.lorewriteup}</p>
                ) : (
                    <p>no lore available</p>
                )}
        </>
    )
}

export default CharacterDetails;