import React from "react";
import UpdateUserEmailForm from "./UpdateUserEmailForm";
import UpdateUserPasswordForm from "./UpdateUserPasswordForm";
import UpdateUserUsernameForm from "./UpdateUserUsernameForm";
import UpdateUserPublicForm from "./UpdateUserPublicForm";

const SettingsPage = () => {
  return (
    <div className="bg-white dark:bg-black text-black dark:text-white p-4 md:p-8 min-h-screen transition-colors duration-300">
      <div className="max-w-[1600px] mx-auto">
        <div className="mb-12 border-l-8 border-black dark:border-white pl-8">
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none italic text-black dark:text-white">
            Account{" "}
            <span className="bg-yellow-400 dark:bg-yellow-500 px-2 text-black">Settings</span>
          </h1>
          <p className="text-2xl font-black uppercase tracking-widest text-black/60 dark:text-white/60 mt-4">
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
