import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

function Login() {
    const { login } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        try {
            const response = await fetch('http://localhost:4000/api/auth/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();
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

    return (
        <div>
            <h2>Login</h2>
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
    )
}

export default Login;