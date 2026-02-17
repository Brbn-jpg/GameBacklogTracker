import React from "react";
import { Link } from "react-router-dom";
import MainLayout from "../layout/MainLayout";

const NotFoundPage = () => {
  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <h1 className="text-9xl font-black text-black leading-none mb-4 select-none relative">
          404
          <span className="absolute top-0 left-0 text-red-500 opacity-30 animate-pulse ml-2 mt-2 -z-10">
            404
          </span>
        </h1>

        <div className="bg-red-500 text-white neo-border-thick p-4 mb-8 neo-shadow rotate-[-2deg]">
          <p className="text-2xl font-black uppercase tracking-widest">
            Sector Void / Signal Lost
          </p>
        </div>

        <p className="text-black/60 font-bold uppercase max-w-md mb-12">
          The coordinates you entered do not correspond to any known asset in
          our database.
        </p>

        <Link
          to="/"
          className="bg-yellow-400 text-black px-8 py-4 text-xl font-black uppercase neo-border-thick neo-shadow neo-transition hover:bg-yellow-300"
        >
          Retreat to Base
        </Link>
      </div>
    </MainLayout>
  );
};

export default NotFoundPage;
