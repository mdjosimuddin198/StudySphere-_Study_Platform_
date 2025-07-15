import React, { Children, createContext, useEffect, useState } from "react";
import { app } from "../firebase/Firebase.config";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import axios from "axios";

export const AuthContext = createContext();
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [logedInuser, setLogedInUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const creatAccount = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false);
      setLogedInUser(user);
      if (user?.email) {
        const info = { userEmail: user.email };
        axios
          .post("http://localhost:5000/jwt_token", info, {
            withCredentials: true,
          })
          .then((res) => {
            // console.log("after jwt token ", res.data);
          })
          .catch((err) => console.log(err));
      }
    });
    return () => unsubscribe();
  }, []);

  const updateUser = (userData) => {
    return updateProfile(auth.currentUser, userData);
  };

  const logOutUser = () => {
    return signOut(auth);
  };

  const handlegoogle = () => {
    return signInWithPopup(auth, provider);
  };

  const authData = {
    loginUser,
    creatAccount,
    updateUser,
    setLogedInUser,
    setLoading,
    loading,
    logedInuser,
    logOutUser,
    handlegoogle,
  };

  return <AuthContext value={authData}>{children}</AuthContext>;
};

export default AuthProvider;
