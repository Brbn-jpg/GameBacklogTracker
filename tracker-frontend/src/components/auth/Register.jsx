import React from "react";
import Footer from "../common/Footer";
import RegisterPage from "./RegisterPage";

const Register = () => {
  return (
    <div className="bg-white flex flex-col min-h-screen">
      <RegisterPage />
      <Footer />
    </div>
  );
};

export default Register;
