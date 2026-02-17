import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import LandingPage from "./components/landingPage/LandingPage";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ForgotPasswordPage from "./components/auth/ForgotPasswordPage";
import ResetPasswordPage from "./components/auth/ResetPasswordPage";
import Dashboard from "./components/dashboard/Dashboard";
import Games from "./components/games/Games";
import GamePage from "./components/games/GamePage";
import ContactPage from "./components/common/ContactPage";
import BlogPage from "./components/common/BlogPage";
import PrivacyPolicy from "./components/common/PrivacyPolicy";
import TermsOfService from "./components/common/TermsOfService";
import NotFoundPage from "./components/common/NotFoundPage";
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
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile/:userId" element={<FriendProfile />} />
          </Route>
          <Route path="/games" element={<Games />} />
          <Route path="/games/:id" element={<GamePage />} />
          <Route path="/igdb-games/:id" element={<GamePage source="igdb" />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
