import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const useJWTAuth = (token) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [expiry, setExpiry] = useState(null);
  const gettoken = localStorage.getItem(token);
  const decoded = jwtDecode(gettoken);
  const currentTime = Math.floor(new Date().getTime() / 1000);
  const expiryTime = decoded.exp;
  const isExpired = currentTime > expiryTime;

  if (isExpired) {
    setLoggedIn(false);
  } else {
    setLoggedIn(true);
    setExpiry(true);
  }
  return { loggedIn, expiry };
};

const useSessionAuth = (key) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const auth = localStorage.getItem(key);

  useEffect(() => {
    setLoggedIn(true);
  }, [key]);

  return { loggedinStatus: "Valid user", loggedIn };
};

const useLogin = (email, password, key) => {
  const userDetails = {
    email,
    password,
  };

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(userDetails));
  }, []);

  return { loginStatus: "Login successfull", key };
};

const useLogout = (key) => {
  const [logout, setLogout] = useState(false);
  useEffect(() => {
    localStorage.removeItem(key);
    setLogout(true);
  }, []);

  return { logoutStatus: "logged out successfully", logout };
};

export { useJWTAuth, useSessionAuth, useLogin, useLogout };
