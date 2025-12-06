import React from "react";
import Footer from "../common/Footer";
import LoginPage from "./LoginPage";

const Login = () => {
  return (
    <div className="bg-slate-950 flex flex-col">
      <LoginPage />
      <Footer />
    </div>
  );
};

export default Login;
