import '../styles/globals.css'
import { AuthContextProvider } from "../Context/AuthContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function MyApp({ Component, pageProps }) {
  return  <AuthContextProvider>
  
    <Component {...pageProps} />
    <ToastContainer />
</AuthContextProvider>
}

export default MyApp
