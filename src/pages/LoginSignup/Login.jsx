import React from "react"
import "./Login.css"
import { GoogleLogin } from "react-google-login"
import axios from "axios"

const Login = () => {
    const onSuccess = async (res) => {
        console.log("Login succes", res.profileObj)

        try {
            const response = await axios.post(`${import.meta.env.VITE_LOCAL_API}/googlelogin`, {
                email: res.profileObj.email,
            })
            const token = response.data.token
            if (!localStorage.getItem("g-token")) window.location.href = "/"
            localStorage.setItem("g-token", token)
        } catch (error) {
            console.log(error)
        }
    }

    const onFailure = (res) => {
        console.log("Login failed", res)
    }

    return (
        <div id="signInButton" className={`${localStorage.getItem("auth-token") ? "disabled" : ""}`}>
            <GoogleLogin
                clientId={import.meta.env.VITE_GAuth_Client_ID}
                buttonText="Login using Google"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={"single_host_origin"}
                isSignedIn={true}
                className="loginsignup-google-ggl"
            />
        </div>
    )
}

export default Login
