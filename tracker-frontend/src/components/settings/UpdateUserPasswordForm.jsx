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
            const response = await fetch('http://localhost:8080/v1/users/me/password', {
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
        <form onSubmit={handleSubmit} className="bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg h-full flex flex-col">
            <h2 className="text-xl font-bold mb-6 text-white">Update Password</h2>
            {error && <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded mb-4 text-sm">{error}</div>}
            
            <div className="mb-4">
                <label className="block text-gray-400 text-sm font-medium mb-1" htmlFor="oldPassword">
                    Old Password
                </label>
                <input
                    className="w-full bg-slate-800/50 border border-white/10 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                    id="oldPassword"
                    type="password"
                    placeholder="Old Password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    required
                />
            </div>
            
            <div className="mb-4">
                <label className="block text-gray-400 text-sm font-medium mb-1" htmlFor="newPassword">
                    New Password
                </label>
                <input
                    className="w-full bg-slate-800/50 border border-white/10 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                    id="newPassword"
                    type="password"
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>

            <div className="mb-6">
                <label className="block text-gray-400 text-sm font-medium mb-1" htmlFor="confirmPassword">
                    Confirm Password
                </label>
                <input
                    className="w-full bg-slate-800/50 border border-white/10 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    value={repeatedPassword}
                    onChange={(e) => setRepeatedPassword(e.target.value)}
                    required
                />
            </div>

            <div className="mt-auto">
                <button
                    className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:shadow-cyan-500/25 transform transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
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
