import React from "react";
import Footer from "../common/Footer";
import LoginPage from "./LoginPage";

const Login = () => {
  return (
    <div className="bg-white flex flex-col min-h-screen">
      <LoginPage />
      <Footer />
    </div>
  );
};

export default Login;
