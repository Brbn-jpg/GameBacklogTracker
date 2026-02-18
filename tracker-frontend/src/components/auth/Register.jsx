import React from "react";
import Footer from "../common/Footer";
import RegisterPage from "./RegisterPage";

const Register = () => {
  return (
    <div className="bg-white dark:bg-black flex flex-col min-h-screen transition-colors duration-300">
      <RegisterPage />
      <Footer />
    </div>
  );
};

export default Register;
