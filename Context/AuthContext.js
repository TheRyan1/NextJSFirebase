import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { signInWithEmailAndPassword,signOut } from "firebase/auth";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);
import { useRouter } from 'next/router';
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({ email: null, uid: null });
  const [loading, setLoading] = useState(true);
  const [loadingUser, setLoadingUser] = useState(false);
  const router = useRouter();
  
  useEffect(() => {
    setLoadingUser(true)
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        console.log("Loggin user",user)
      if (user) {
        setUser({
          email: user.email,
          uid: user.uid,
        });
        setLoadingUser(false)
      } else {
        setUser({ email: null, uid: null });
        setLoadingUser(false)
      }
    });
    setLoading(false);

    return () => unsubscribe();
  }, []);


  const logIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  
  const logOut = async () => {
      setUser({ email: null, uid: null });
      await signOut(auth);
    };

  return (
    <AuthContext.Provider value={{ user,logIn,logOut,loadingUser }}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};