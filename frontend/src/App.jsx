//import { useState } from "react";
import { Routes, Route } from "react-router-dom";
//import reactLogo from './assets/react.svg'
//import viteLogo from './assets/vite.svg'
//import heroImg from './assets/hero.png'
import "./App.css";
import Header from "./components/Header";
import EvaluatorPage from "./pages/EvaluatorPage";
//import ApiCall from "./components/ApiCall";
//import PostList from "./components/PostList";
//import AxiosFilter from "./components/AxiosFilter";
//import AIJobsFilter from "./components/AIJobsFilter";
//import TaskManager from "./components/TaskManager";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import AdminPage from "./pages/AdminPage";

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

function App() {
  return (
    <>
      <Header />
      {/* <EvaluatorPage />
      <ApiCall />
      <PostList />
      <AIJobsFilter />
      <TaskManager />
      <AxiosFilter/> */}
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <EvaluatorPage />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<p>Page not found</p>} />
      </Routes>
    </>
  );
}
export default App;