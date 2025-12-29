import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import LandingPage from "./components/landingPage/LandingPage";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/Dashboard";
import Games from "./components/games/Games";
import GamePage from "./components/games/GamePage";
import ContactPage from "./components/common/ContactPage";
import BlogPage from "./components/common/BlogPage";
import ProtectedRoute from "./components/common/ProtectedRoute";
import FriendProfile from "./components/friends/FriendProfile";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile/:userId" element={<FriendProfile />} />
          </Route>
          <Route path="/games" element={<Games />} />
          <Route path="/games/:id" element={<GamePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<BlogPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
