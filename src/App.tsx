import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useAppDispatch } from "./app/hooks";
import { Header } from "./components/header/Header";
import {
  useAuthPhoneNumberMutation,
  useLoginMutation,
} from "./features/auth/authApi";
import { setCredentials } from "./features/auth/authSlice";
import { Home } from "./pages/Home";
import { LkDoctor } from "./pages/LkDoctor";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/consultation"
          element={<LkDoctor />}
        />
      </Routes>
    </>
  );
}

export default App;
