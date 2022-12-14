import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAuth } from "../Context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const { user, loadingUser } = useAuth();
  const checkLoginStatus = async () => {};
  useEffect(() => {
    if (!user.uid && loadingUser == false) {
      router.push("/auth/login");
    } else {
      console.log(user);
    }
  }, [loadingUser]);
  return <div>{user.uid ? children : <div>Checking login status</div>}</div>;
};

export default ProtectedRoute;
