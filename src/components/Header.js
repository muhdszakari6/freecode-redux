import React from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../store/authSlice";
import Cart from "./Cart";
import "./Header.css";
const Header = () => {
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(authActions.logout());
  };
  return (
    <header>
      <nav className="header-nav">
        <ul className="header-ul">
          <li>
            <h2
              className="header-h2"
              style={{ fontFamily: "monospace", fontSize: "30px" }}
            >
              Redux Shopping App
            </h2>
          </li>
          <div style={{ display: "flex", alignItems: "center" }}>
            <li>
              <Cart />
            </li>
            <li>
              <button
                onClick={logout}
                style={{ marginTop: 0 }}
                className="logout-btn"
              >
                Logout
              </button>
            </li>
          </div>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
