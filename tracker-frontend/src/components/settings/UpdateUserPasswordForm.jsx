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
            const response = await fetch(`${process.env.REACT_APP_API_URL || "http://localhost:8080"}/v1/users/me/password`, {
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
        <form onSubmit={handleSubmit} className="bg-white neo-border-thick p-8 neo-shadow h-full flex flex-col">
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-8 border-b-4 border-black pb-2 italic">Update Password</h2>
            
            {error && <div className="bg-red-500 text-white neo-border p-3 font-black uppercase text-sm mb-6">{error}</div>}
            
            <div className="space-y-6 flex-grow">
                <div className="space-y-2">
                    <label className="block text-sm font-black uppercase tracking-widest" htmlFor="oldPassword">
                        Current Password
                    </label>
                    <input
                        className="w-full bg-white neo-border-thick p-4 text-black font-bold outline-none focus:bg-cyan-50 placeholder-gray-400"
                        id="oldPassword"
                        type="password"
                        placeholder="********"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        required
                    />
                </div>
                
                <div className="space-y-2">
                    <label className="block text-sm font-black uppercase tracking-widest" htmlFor="newPassword">
                        New Password
                    </label>
                    <input
                        className="w-full bg-white neo-border-thick p-4 text-black font-bold outline-none focus:bg-cyan-50 placeholder-gray-400"
                        id="newPassword"
                        type="password"
                        placeholder="********"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-black uppercase tracking-widest" htmlFor="confirmPassword">
                        Confirm Password
                    </label>
                    <input
                        className="w-full bg-white neo-border-thick p-4 text-black font-bold outline-none focus:bg-cyan-50 placeholder-gray-400"
                        id="confirmPassword"
                        type="password"
                        placeholder="********"
                        value={repeatedPassword}
                        onChange={(e) => setRepeatedPassword(e.target.value)}
                        required
                    />
                </div>
            </div>

            <button
                className="w-full bg-cyan-400 text-black font-black py-4 px-4 mt-8 neo-border-thick neo-shadow uppercase text-xl neo-transition tracking-tighter"
                type="submit"
                disabled={loading}
            >
                {loading ? 'Updating...' : 'Change Password'}
            </button>
        </form>
    );
};

export default UpdateUserPasswordForm;
