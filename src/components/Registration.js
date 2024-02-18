import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Register() {
    // States
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    // State to manage form submission
    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleSubmit = async(e) => {
        e.preventDefault();
        // Try registration
        try {
            const response = await fetch('http://localhost:4000/api/auth/register', {
                method: 'POST',
                headers : {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password, email }),
            });
            const data = await response.json();
            console.log(data);
            console.log(`switching to ${!formSubmitted}`);
            setFormSubmitted(formSubmitted => !formSubmitted);
        } catch(error) {
            console.error('Registration failed:', error);
        }
    }

    // If form is submitted
    if (formSubmitted) {
        return (
            <p>Form submitted! <Link to='/login'>LOGIN</Link> now!</p>
        );
        
    }
    
    // Else
    return (
        <form onSubmit = {handleSubmit}>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="text"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">Register</button>
        </form>
    );
}

export default Register;