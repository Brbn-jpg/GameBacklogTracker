import React from "react";
import Footer from "../common/Footer";
import LoginPage from "./LoginPage";

const Login = () => {
  return (
    <div className="bg-white dark:bg-black flex flex-col min-h-screen transition-colors duration-300">
      <LoginPage />
      <Footer />
    </div>
  );
};

export default Login;
