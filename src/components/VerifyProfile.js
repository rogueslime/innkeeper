import React, { useState, useEffect }from 'react';
import {useAuth} from '../context/AuthContext';
import { useParams, Navigate } from 'react-router-dom';

function VerifyProfile() {
    const { logout } = useAuth();
    const { token } = useParams();
    const [verified, setVerified] = useState(false);
    const [loading, setLoading] = useState(true); //loads until process complete
    useEffect(() => {
        const verifyEmailToken = async () => {
            try {
                const response = await fetch(`http://localhost:4000/api/auth/verify-email/${token}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = await response.json();
                if (data.message === 'Email verified!') {
                    setVerified(true);
                } else {
                    alert(data.message);
                }
            } catch (error) {
                console.error('verification error:',error);
            } finally {
                logout();
                setLoading(false);
            }
        };
        if(!verified){
            verifyEmailToken();
        }
    }, [token]);

    if (loading) {
        return <div>Verifying...</div>
    }

    if(verified) {
        return <Navigate to="/login" replace={true} /> 
    } else if(!verified) {
        return <div>Error verifying. Please try again later.</div>
    }
}

export default VerifyProfile;