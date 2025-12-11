import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';

const UpdateUserPasswordForm = () => {
    const { token, logout } = useAuth();
    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [repeatedPassword, setRepeatedPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (password !== repeatedPassword) {
            setError('New passwords do not match');
            toast.error('New passwords do not match');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/v1/users/me/password', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ oldPassword, password, repeatedPassword }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update password');
            }

            toast.success('Password updated successfully! Please log in again.');
            logout();
        } catch (error) {
            setError(error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Update Password</h2>
            {error && <p className="text-red-500 text-xs italic">{error}</p>}
            <div className="mb-4">
                <label className="block text-white text-sm font-bold mb-2" htmlFor="oldPassword">
                    Old Password
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-white bg-gray-800 leading-tight focus:outline-none focus:shadow-outline"
                    id="oldPassword"
                    type="password"
                    placeholder="Old Password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-white text-sm font-bold mb-2" htmlFor="newPassword">
                    New Password
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-white bg-gray-800 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="newPassword"
                    type="password"
                    placeholder="******************"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <div className="mb-6">
                <label className="block text-white text-sm font-bold mb-2" htmlFor="confirmPassword">
                    Confirm Password
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-white bg-gray-800 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="confirmPassword"
                    type="password"
                    placeholder="******************"
                    value={repeatedPassword}
                    onChange={(e) => setRepeatedPassword(e.target.value)}
                    required
                />
            </div>
            <div className="flex items-center justify-between">
                <button
                    className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-cyan-300"
                    type="submit"
                    disabled={loading}
                >
                    {loading ? 'Updating...' : 'Update Password'}
                </button>
            </div>
        </form>
    );
};

export default UpdateUserPasswordForm;
