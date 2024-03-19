import React, { useState, useEffect } from "react";
import "./App.css";
import TetrisLoader from "./screens/loading/TetrisLoader";
import MacroPage from "./screens/macro/MacroPage";
import Layout from "./Layout";
import { Routes, Route } from "react-router-dom";
import Signup from "./screens/authentication/Signup";
import Signin from "./screens/authentication/Signin";
import RegisterForm from "./screens/authentication/RegisterForm";
import ProfilePage from "./screens/authentication/ProfilePage";
import PasswordReset from "./screens/authentication/PasswordReset";
import RestaurantsPage from "./screens/restaurants/RestaurantsPage";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 0);
  }, []);

  if (isLoading) {
    return <TetrisLoader />;
  }
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<div>HOME</div>} />
        <Route path="/login" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/register-form" element={<RegisterForm />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/reset-password" element={<PasswordReset />} />
        <Route path="/restaurants" element={<RestaurantsPage />} />
        <Route path="/macro" element={<MacroPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
