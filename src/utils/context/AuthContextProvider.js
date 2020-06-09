import React, { useState, useEffect, createContext, useReducer } from 'react';
import { addUser } from "../actions/User";
import { userReducer, initialState } from "../reducers/User";
import app from '../../base';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [user, dispatch] = useReducer(userReducer, initialState);

  const actions = {
    addToUser(user) {
      dispatch(addUser(user));
    },
  };

  useEffect(() => {
    app.auth().onAuthStateChanged(setCurrentUser);
  }, [currentUser, setCurrentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, actions, user }}>
      { children }
    </AuthContext.Provider>
  );
};

export const AuthContextConsumer = AuthContext.Consumer;
