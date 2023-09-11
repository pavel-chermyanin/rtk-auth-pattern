import React, { useState } from "react";
import { useAppDispatch } from "../app/hooks";
import {
  useAuthPhoneNumberMutation,
  useLoginMutation,
} from "../features/auth/authApi";
import { setCredentials } from "../features/auth/authSlice";
interface Props {}
export const Home: React.FC<Props> = () => {


  return <h1>Home</h1>;
};
