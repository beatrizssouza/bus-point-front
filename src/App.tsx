import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/login/login";
import Home from "./components/home/home";
import AppBarComponent from "./components/appbar/appbar";
import { AuthProvider } from "./context/resources";
import AdminPage from "./components/admin/admin";
import PrivateRoute from "./utils/PrivateRoute";
import Point from "./components/admin/pages/Point/Point";
import Lines from "./components/admin/pages/Lines/Lines";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <AppBarComponent />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <AdminPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/point"
            element={
              <PrivateRoute>
                <Point />
              </PrivateRoute>
            }
          />
           <Route
            path="/admin/lines"
            element={
              <PrivateRoute>
                <Lines />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
