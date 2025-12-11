import React from 'react';
import UpdateUserEmailForm from './UpdateUserEmailForm';
import UpdateUserPasswordForm from './UpdateUserPasswordForm';
import UpdateUserUsernameForm from './UpdateUserUsernameForm';

const SettingsPage = () => {
    return (
<div className="container mx-auto p-4 text-white min-h-screen">
    <h1 className="text-2xl font-bold mb-4">Settings</h1>
    <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <UpdateUserEmailForm />
            <UpdateUserPasswordForm />
            <UpdateUserUsernameForm />
        </div>
    </div>
</div>
    );
};

export default SettingsPage;
