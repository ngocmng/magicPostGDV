import * as React from 'react';
import { useState, useEffect, createContext } from "react";
import { fireAuth } from "../../database/firebase";
import { loadUserState, clearUserState } from "../../database/cache";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const observer = fireAuth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      if (user) loadUserState(user.email);
      else clearUserState();
    });
    return () => observer();
  }, []);

  return (
    <AuthContext.Provider value={currentUser}>{children}</AuthContext.Provider>
  );
};