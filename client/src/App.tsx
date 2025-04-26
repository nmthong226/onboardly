import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";

// Layout
import AuthLayout from "@/layouts/AuthLayout";
import MainLayout from "@/layouts/MainLayout";


// Pages / Features
import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";
import Verify from "@/pages/Auth/Verify";
import Dashboard from "@/pages/Dashboard/Dashboard";

const authRoutes = [
  { path: "/auth/login", element: <Login /> },
  { path: "/auth/register", element: <Register /> },
  { path: "/auth/verify-email", element: <Verify /> }
];
const inAppRoutes = [
  { path: "/dashboard/home", element: <Dashboard /> },
]

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public Auth Routes */}
        {authRoutes.map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={<AuthLayout>{element}</AuthLayout>}
          />
        ))}
        {/* In-App Routes */}
        {inAppRoutes.map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={<MainLayout>{element}</MainLayout>}
          />
        ))}
      </Routes>
    </Router>
  );
};

export default App;