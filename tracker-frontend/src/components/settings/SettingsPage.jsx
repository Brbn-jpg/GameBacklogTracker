import React from "react";
import UpdateUserEmailForm from "./UpdateUserEmailForm";
import UpdateUserPasswordForm from "./UpdateUserPasswordForm";
import UpdateUserUsernameForm from "./UpdateUserUsernameForm";
import UpdateUserPublicForm from "./UpdateUserPublicForm";

const SettingsPage = () => {
  return (
    <div className="bg-white text-black p-4 md:p-8 min-h-screen">
      <div className="max-w-[1600px] mx-auto">
        <div className="mb-12 border-l-8 border-black pl-8">
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none italic">
            Account{" "}
            <span className="bg-yellow-400 px-2 not-italic">Settings</span>
          </h1>
          <p className="text-2xl font-black uppercase tracking-widest text-black/40 mt-4">
            Manage your profile
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10">
          <div className="space-y-10 lg:col-span-2 xl:col-span-1">
            <UpdateUserPublicForm />
            <UpdateUserUsernameForm />
          </div>
          <UpdateUserEmailForm />
          <UpdateUserPasswordForm />
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
