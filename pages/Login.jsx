import React,{useState} from "react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "../Context/AuthContext";
import { Grid, Typography, TextField  } from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import LoadingButton from '@mui/lab/LoadingButton'
function Login() {
  const { logIn, user } = useAuth();
  const [loginLoading,setLoginLoading] = useState(false)

  const router = useRouter();

  const logInUser = async (data) => {
    try {
      setLoginLoading(true)
      await logIn(data.email, data.password);
      toast("Login Success",{type:"success"})
      router.push("/dashboard");
    } catch (error) {
      setLoginLoading(false)
      console.log(error.message);
      toast(error.message,{type:"error" })
    }
  };
  React.useEffect(() => {
    console.log(user);
    if (user.uid) {
      router.push("/dashboard");
    }
  }, [router, user]);
  const { values, submitForm, handleChange } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      logInUser(values);
    },
  });
  return (
    <Grid
      container
      rowGap={5}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh' }}
    >
      <Grid
        container
        rowGap={4}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ width: "fit-content",boxShadow:"rgba(0, 0, 0, 0.35) 0px 5px 15px",padding:"20px",borderRadius:"10px"}}
      >
        <Grid item xs={12}>
          <Typography variant="h3">Login</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            size="small"
            label={"Email"}
            name="email"
            value={values.email}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="password"
            value={values.password}
            onChange={handleChange}
            variant="outlined"
            size="small"
            label={"Password"}
            type={"password"}
          />
        </Grid>
        <Grid item xs={12}>
          <LoadingButton loading={loginLoading} variant="contained" onClick={submitForm}>
            LOGIn
          </LoadingButton>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Login;
