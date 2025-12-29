import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import Cookies from 'js-cookie';

const UpdateUserPublicForm = () => {
    const [isPublic, setIsPublic] = useState(true);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const { token } = useAuth();

    useEffect(() => {
        const fetchUserProfile = async () => {
            setLoading(true);
            try {
                const response = await fetch("http://localhost:8080/v1/users/me", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch user profile");
                }

                const data = await response.json();
                setIsPublic(data.isPublic);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        fetchUserProfile();
    }, [token]);

    const handleToggle = async () => {
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const response = await fetch('http://localhost:8080/v1/users/me/public', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ isPublic: !isPublic })
            });

            if (!response.ok) {
                throw new Error('Failed to update profile visibility');
            }

            const data = await response.json();
            setIsPublic(data.isPublic);
            setSuccess(`Profile is now ${data.isPublic ? 'Public' : 'Private'}`);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Profile Visibility</h2>
            <p className="text-slate-400 text-sm mb-4">
                When your profile is private, only you can see your game list and stats.
            </p>
            
            {error && <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded mb-4">{error}</div>}
            {success && <div className="bg-green-500/10 border border-green-500/50 text-green-500 p-3 rounded mb-4">{success}</div>}

            <div className="flex items-center justify-between">
                <span className="text-white font-medium">
                    {isPublic ? 'Public Profile' : 'Private Profile'}
                </span>
                <button
                    onClick={handleToggle}
                    disabled={loading}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-900 ${
                        isPublic ? 'bg-cyan-500' : 'bg-slate-700'
                    }`}
                >
                    <span
                        className={`${
                            isPublic ? 'translate-x-6' : 'translate-x-1'
                        } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                    />
                </button>
            </div>
        </div>
    );
};

export default UpdateUserPublicForm;
