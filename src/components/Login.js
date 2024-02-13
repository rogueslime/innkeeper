import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
    // State managers. useAuth for login func.
    const { login } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // State to manage form submission.
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        // Try logging in.
        try {
            const response = await fetch('http://localhost:4000/api/auth/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();
            // Toggle form submission to remove form from login page.
            setIsSubmitted(isSubmitted => !isSubmitted);
            if (response.ok) {
                login(data.token, data.user);
            } else {
                setError(data.error || 'Something went wrong')
            }
        } catch (error) {
            console.error('Login error: ',error);
            setError('Failed login.');
        }
    };

    // If the form has been submitted...
    if (isSubmitted) {
        return (
            <p>Logged in! Return to <Link to='/'>HOME</Link></p>
        );
    }
    // Else
    return (
        <div>
            <h2>Login</h2>
            {/* error display */}
            {error && <p style={{ color: 'red'}}>{error}</p>}
            <form onSubmit = {handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        type='username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type='submit'>Login</button>
            </form>
        </div>
    );
}

export default Login;