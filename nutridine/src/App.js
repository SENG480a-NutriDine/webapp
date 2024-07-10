import React, { useState, useEffect } from "react";
import "./App.css";
import TetrisLoader from "./screens/loading/TetrisLoader";
import MacroPage from "./screens/macro/MacroPage";
import Layout from "./Layout";
import { Routes, Route } from "react-router-dom";
import Signup from "./screens/authentication/Signup";
import Signin from "./screens/authentication/Signin";
import NutrientPreferences from "./screens/nutrientPreferences/NutrientPreferences";
import RegisterForm from "./screens/authentication/RegisterForm";
import ProfilePage from "./screens/authentication/ProfilePage";
import PasswordReset from "./screens/authentication/PasswordReset";
import Homepage from "./screens/Homepage";
import RestaurantsPage from "./screens/restaurants/RestaurantsPage";
import MealsPage from "./screens/restaurants/MealsPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { Root } from "./screens/Root";

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
        <Route path="/" element={<Root />} />
        <Route path="/home" element={<ProtectedRoute><Homepage /></ProtectedRoute>} />
        <Route path="/register-form" element={<ProtectedRoute><RegisterForm /></ProtectedRoute>} />
        <Route path="/preferences-page" element={<ProtectedRoute><NutrientPreferences /></ProtectedRoute>} />
        <Route path="/reset-password" element={<ProtectedRoute><PasswordReset /></ProtectedRoute>} />
        <Route path="/restaurants/:brandId" element={<ProtectedRoute><MealsPage /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path="/restaurants" element={<ProtectedRoute><RestaurantsPage /></ProtectedRoute>} />
        <Route path="/macro" element={<ProtectedRoute><MacroPage /></ProtectedRoute>}
        />
      </Routes>
    </Layout>
  );
}

export default App;
