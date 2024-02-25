import React from 'react';
import './style/ProgrammerInfo.css';
import trayPhoto from '../images/trayPhoto.png';

function ProgrammerInfo() {
    return (
        <div class = 'programmer-details'>
            <img className = 'tray-image' src={trayPhoto} alt='image of the programmer!'/>
            <div class = 'textBlock'>
                <h2>Meet the Programmer</h2>
                <p>Hey, I'm Tray Berry, a big nerd who loves D&D and coding quite a bit! I decided to smash those two together for a project to further my skills as a web developer. It's been a fun way to level up my coding skills while messing around with something I'm super into.</p>
            </div>
        </div>
    )
}

export default ProgrammerInfo;