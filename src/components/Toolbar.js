import React from 'react';

function Toolbar() {
    return (
        <>
            <style>
                {`
                .toolbar {
                    display: flex;
                    flex-direction: row;
                    justify-content: center; /* Center the items horizontally */
                    align-items: center; /* Center the items vertically (optional) */
                `}
            </style>

            <div className = 'toolbar'>
                <span>Sign In</span>
                <span>Create a Character</span>
            </div>
        </>
    );
}

export default Toolbar;