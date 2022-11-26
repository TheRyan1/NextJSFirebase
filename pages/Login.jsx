import React from 'react'
import {useFormik} from 'formik'
import { useRouter } from 'next/router';
import { signInWithEmailAndPassword } from "firebase/auth";
import {useAuth} from '../Context/AuthContext'
function Login() {
  const { logIn ,user} = useAuth();
 
const router = useRouter();

const logInUser = async (data) => {
  try {
    await logIn(data.email, data.password);
    router.push("/dashboard");
  } catch (error) {
    console.log(error.message);
  }
};
React.useEffect(() => {
  console.log(user)
  if (user.uid ) {
    router.push("/dashboard");
  }
}, [router, user]);
    const {values,submitForm,handleChange} = useFormik({
        initialValues:{
            email:"",
            password:""
        },
        onSubmit: (values)=>{
          logInUser(values)
        }
    })
  return (
    <>
     <div>LOGIN PAGE</div>
    <input name='email' type={"text"} value={values.email} onChange={handleChange} placeholder="email" />
    <input name='password' type={"password"} value={values.password} onChange={handleChange} placeholder="email" />
    <button onClick={submitForm}>LOGIn</button>
       
    </>

  )
}

export default Login