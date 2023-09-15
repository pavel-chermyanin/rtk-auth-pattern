import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useAppDispatch } from "./store/hooks";
import { Header } from "./components/header/Header";
import {
  useGetMeUserQuery,
} from "./features/auth/authApi";
import {  setUser } from "./features/auth/authSlice";
import { Home } from "./pages/Home";
import { LkDoctor } from "./pages/LkDoctor";
import Login from "./pages/Login";

function App() {
  const dispatch = useAppDispatch();

  // При загрузке приложения - делаем запрос на текущего пользователя
  // и записываем его в authSlice
  const { data: user } = useGetMeUserQuery();

  useEffect(() => {
    if (user) dispatch(setUser(user));
  }, [user, dispatch]);
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
