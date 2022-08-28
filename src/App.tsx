import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import axios from "axios";
import "./App.scss";
import { Sidebar } from "src/features/ui";
import {
  CategoriesPage,
  Home,
  LoginPage,
  ProductsPage,
  RegistrationPage,
} from "src/pages";
import { useStateContext } from "./hooks/useStateContext";
import { AuthResponse } from "./http/requests.types";

function App() {
  const { isAuth, setIsAuth, setUser } = useStateContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    async function checkAuth() {
      try {
        setIsLoading(true);
        const response = await axios.get<AuthResponse>(
          `${process.env.REACT_APP_API_URL}/user/refresh`,
          { withCredentials: true }
        );
        localStorage.setItem("token", response.data.accessToken);
        setUser({
          id: response.data.user.id,
          username: response.data.user.username,
        });
        setIsAuth(true);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    if (localStorage.getItem("token")) {
      checkAuth();
    }
  }, []);

  //  FIXME:
  if (isLoading) return null;

  return (
    <Router>
      <Sidebar />
      <Routes>
        {!isAuth && (
          <>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/categories" element={<Navigate to="/login" />} />
            <Route path="/products" element={<Navigate to="/login" />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registration" element={<RegistrationPage />} />
          </>
        )}
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/login" element={<Navigate to="/" />} />
        <Route path="/registration" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
