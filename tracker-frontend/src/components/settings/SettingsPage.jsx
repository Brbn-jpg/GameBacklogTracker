import React from 'react';
import UpdateUserEmailForm from './UpdateUserEmailForm';
import UpdateUserPasswordForm from './UpdateUserPasswordForm';
import UpdateUserUsernameForm from './UpdateUserUsernameForm';
import UpdateUserPublicForm from './UpdateUserPublicForm';

const SettingsPage = () => {
    return (
        <div className="bg-slate-950 min-h-screen text-white">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-8">Settings</h1>
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <UpdateUserPublicForm />
                        <UpdateUserEmailForm />
                        <UpdateUserPasswordForm />
                        <UpdateUserUsernameForm />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
