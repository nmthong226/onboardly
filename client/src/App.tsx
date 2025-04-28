import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import React from "react";

// API/Hooks
import useStore from "./stores/userStore";

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
  const user = useStore((state) => state.user); // Zustand store to get the user state

  return (
    <Router>
      <Routes>
        {/* Public Auth Routes */}
        {authRoutes.map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={
              user ? (
                <Navigate to="/dashboard/home" replace />
              ) : (
                <AuthLayout>{element}</AuthLayout>
              )
            }
          />
        ))}
        {/* In-App Routes */}
        {inAppRoutes.map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={
              user ? (
                <MainLayout>
                  {element}
                </MainLayout>
              ) : (
                <Navigate to="/auth/login" replace />
              )
            }
          />
        ))}
        {/* Redirect from "/" to "/auth/login" if not logged in */}
        <Route
          path="/"
          element={
            user ? (
              <Navigate to="/dashboard/home" replace />
            ) : (
              <Navigate to="/auth/login" replace />
            )
          }
        />
        {/* Catch-all route: redirect unmatched paths */}
        <Route
          path="*"
          element={
            user ? (
              <Navigate to="/dashboard/home" replace />
            ) : (
              <Navigate to="/auth/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;