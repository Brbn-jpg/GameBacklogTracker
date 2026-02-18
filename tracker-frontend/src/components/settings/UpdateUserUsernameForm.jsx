import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';

const UpdateUserUsernameForm = () => {
    const { token } = useAuth();
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL || "http://localhost:8080"}/v1/users/me/username`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ username }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update username');
            }

            toast.success('Username updated successfully!');
        } catch (error) {
            setError(error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-black neo-border-thick dark:border-white p-8 neo-shadow dark:neo-shadow-white flex flex-col transition-colors duration-300">
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-8 border-b-4 border-black dark:border-white pb-2 italic text-black dark:text-white">Update Username</h2>
            
            {error && <div className="bg-red-500 text-white neo-border dark:border-white p-3 font-black uppercase text-sm mb-6">{error}</div>}
            
            <div className="space-y-2 mb-8 flex-grow">
                <label className="block text-sm font-black uppercase tracking-widest text-black dark:text-white" htmlFor="username">
                    New Username
                </label>
                <input
                    className="w-full bg-white dark:bg-black neo-border-thick dark:border-white p-4 text-black dark:text-white font-bold outline-none focus:bg-cyan-50 dark:focus:bg-yellow-400 dark:focus:text-black placeholder-black/40 dark:placeholder-white/60"
                    id="username"
                    type="text"
                    placeholder="Enter new username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>
            
            <button
                className="w-full bg-cyan-400 dark:bg-cyan-500 text-black font-black py-4 px-4 neo-border-thick dark:border-white neo-shadow dark:neo-shadow-white uppercase text-xl neo-transition tracking-tighter"
                type="submit"
                disabled={loading}
            >
                {loading ? 'Processing...' : 'Save Changes'}
            </button>
        </form>
    );
};

export default UpdateUserUsernameForm;
