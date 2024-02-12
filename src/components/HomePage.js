import React, { useState, useEffect } from 'react';
import './style/HomePage.css';
import catLogo from '../images/innkeeperMage.png';

function HomePage() {
    return (
        <div className="home-content">

            <div className='intro-text'>
                <h2>Innkeeper is a DnD app for tracking and sharing your characters' stories. Where some TTRPG character managers aim to replace your handy notebook, Innkeeper aims to supplement it. Instead of providing a digital notebook for you to wholly track your character, Innkeeper provides you a "social network" in which you can share your favorite characters and their backstories with others.</h2>
            </div>

            <img className="home-logo" src={catLogo} alt="Cat Logo"/>
            
        </div>
    );
}
export default HomePage;