import React, { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import auth from "../Firebase/Firebase.init";
import axios from "axios";
import {
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize Google Auth Provider
  const googleProvider = new GoogleAuthProvider();

  // !Create User Function
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  // Login Function
  const userLogin = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  // User LogOut
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };
  // Login With Google
  const signInWithGoogle = () => {
    setLoading(true);

    return signInWithPopup(auth, googleProvider);
  };
  // Observer To setUser
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("State capture ", currentUser);
      if (currentUser?.email) {
        const user = { email: currentUser.email };
        axios
          .post("https://hotel-server-chi.vercel.app/jwt", user, {
            withCredentials: true,
          })
          .then((res) => {
            setLoading(false);
            console.log("Login token--->  ", res.data);
          });
      } else {
        axios
          .post(
            "https://hotel-server-chi.vercel.app/logout",
            {},
            { withCredentials: true }
          )
          .then((res) => {
            setLoading(false);
            console.log("logout", res.data);
          });
      }
    });
    return () => {
      unSubscribe();
    };
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    userLogin,
    logOut,
    signInWithGoogle,
    setUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
