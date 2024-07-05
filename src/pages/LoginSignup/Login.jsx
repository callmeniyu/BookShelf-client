import React from "react"
import { useGoogleLogin } from '@react-oauth/google';
import axios from "axios"
import GoogleIcon from '@mui/icons-material/Google';

const Login = () => {

    const login = useGoogleLogin({
        onSuccess:async (response) => {
            try {
                const result = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
                    headers: {
                        Authorization: `Bearer ${response.access_token}`
                    }
                });
                const email = result.data.email
                console.log(email)
                const res = await axios.post(`${import.meta.env.VITE_BACKEND_API}googlelogin`, {
                    email: email,
                })
                const token = res.data.token
                localStorage.setItem("g-token", token)
                if (localStorage.getItem("g-token")) window.location.href = "/"
                
            } catch (error) {
                console.log(error)
            }
        },

      });
      
    return (
        <>
            <button className={`loginsignup-google-ggl ${localStorage.getItem("auth-token") ? "disabled" : ""}`} onClick={() => login()}><GoogleIcon /> Sign in with Google</button>
        </>
    )
}

export default Login
