import React from "react";
import { Link } from "react-router-dom";
interface HeaderProps {}
export const Header: React.FC<HeaderProps> = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">Главная</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/doctor-profile">Профиль</Link>
        </li>
      </ul>
    </div>
  );
};