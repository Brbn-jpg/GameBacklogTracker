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
            const response = await fetch('/api/v1/users/me/username', {
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
        <form onSubmit={handleSubmit} className="p-4 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Update Username</h2>
            {error && <p className="text-red-500 text-xs italic">{error}</p>}
            <div className="mb-4">
                <label className="block text-white text-sm font-bold mb-2" htmlFor="username">
                    New Username
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-white bg-gray-800 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    placeholder="New Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>
            <div className="flex items-center justify-between">
                <button
                    className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-cyan-300"
                    type="submit"
                    disabled={loading}
                >
                    {loading ? 'Updating...' : 'Update Username'}
                </button>
            </div>
        </form>
    );
};

export default UpdateUserUsernameForm;
