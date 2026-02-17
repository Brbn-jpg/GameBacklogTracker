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
        <form onSubmit={handleSubmit} className="bg-white neo-border-thick p-8 neo-shadow flex flex-col">
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-8 border-b-4 border-black pb-2 italic">Update Username</h2>
            
            {error && <div className="bg-red-500 text-white neo-border p-3 font-black uppercase text-sm mb-6">{error}</div>}
            
            <div className="space-y-2 mb-8 flex-grow">
                <label className="block text-sm font-black uppercase tracking-widest" htmlFor="username">
                    New Username
                </label>
                <input
                    className="w-full bg-white neo-border-thick p-4 text-black font-bold outline-none focus:bg-cyan-50 placeholder-gray-400"
                    id="username"
                    type="text"
                    placeholder="Enter new username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>
            
            <button
                className="w-full bg-cyan-400 text-black font-black py-4 px-4 neo-border-thick neo-shadow uppercase text-xl neo-transition tracking-tighter"
                type="submit"
                disabled={loading}
            >
                {loading ? 'Processing...' : 'Save Changes'}
            </button>
        </form>
    );
};

export default UpdateUserUsernameForm;
