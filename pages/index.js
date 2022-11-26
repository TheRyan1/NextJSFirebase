import React from 'react'
import { useRouter } from "next/router";
import { useAuth } from "../Context/AuthContext";
import Protected from '../components/Protected';
function Index() {
    const { user, logOut } = useAuth();
    const router = useRouter();
    const handleLogout = async () => {
        try {
          await logOut();
          router.push("/Login");
        } catch (error) {
          console.log(error.message);
        }
      };
  return (
<Protected>
        <div>{user.email}</div>
        <button onClick={handleLogout}>Logout</button>
        </Protected>

  )
}

export default Index