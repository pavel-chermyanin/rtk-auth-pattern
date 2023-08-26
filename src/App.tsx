import React, { useState } from "react";
import {
  useAuthPhoneNumberMutation,
  useLoginMutation,
} from "./app/services/auth";

function App() {
  const [authPhoneNumber] = useAuthPhoneNumberMutation();
  const [login] = useLoginMutation();
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState(""); // Состояние для выбора пола

  const handleGenderChange = (event: any) => {
    setGender(event.target.value);
  };

  const handleSubmit = () => {
    authPhoneNumber({ phone_number: "+" + phone });
    login({ phone_number: phone, code: "1111", who_am_i: gender });
  };

  return (
    <div className="App">
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

export default App;
