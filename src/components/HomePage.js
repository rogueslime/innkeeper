import React, { useState, useEffect } from 'react';

function HomePage() {
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetch('http://localhost:4000/api')
            .then(response => response.text()) // Getting the text response
            .then(data => {
                setMessage(data);
            })
            .catch(error => console.error('There was an error!', error));
    }, []);

    return (
        <div>
            {message}
        </div>
    );
}
export default HomePage;