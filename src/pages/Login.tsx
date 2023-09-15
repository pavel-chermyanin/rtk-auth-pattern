import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../store/hooks";
import {
  useAuthPhoneNumberMutation,
  useGetMeUserQuery,
  useLoginMutation,
} from "../features/auth/authApi";
import { setCredentials, setUser } from "../features/auth/authSlice";
import { Credentials } from "../types/auth/Credentials";

function Login() {
  const dispatch = useAppDispatch();
  const [authPhoneNumber] = useAuthPhoneNumberMutation();
  const [login] = useLoginMutation();
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState(""); // Состояние для выбора patient/doctor
  const { data: user, refetch: refetchUser } = useGetMeUserQuery(); // Выполняем запрос и получаем refetch функцию
  const handleGenderChange = (event: any) => {
    setGender(event.target.value);
  };

  const handleSubmit = async () => {
    authPhoneNumber({ phone_number: "+" + phone });
    const tokens = await login({
      phone_number: phone,
      code: "1111",
      who_am_i: gender,
    }).unwrap();
    dispatch(setCredentials(tokens));
    refetchUser();
  };

  return (
    <div className="Login">
      <input
        type="radio"
        name="gender"
        value="patient"
        onChange={handleGenderChange}
      />
      patient
      <input
        type="radio"
        name="gender"
        value="doctor"
        onChange={handleGenderChange}
      />
      doctor
      <input
        type="text"
        onChange={(e) => setPhone(e.target.value)}
      />
      <button onClick={handleSubmit}>отправить номер</button>
    </div>
  );
}

export default Login;
