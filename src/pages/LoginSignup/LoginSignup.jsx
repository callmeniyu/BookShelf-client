import React, { useEffect, useState } from "react"
import "./LoginSignup.css"
import Login from "./Login"
import Logout from "./Logout"
import { gapi } from "gapi-script"
import axios from "axios"
const LoginSignup = () => {
    const [state, setState] = useState("Login")
    const [checked, setChecked] = useState(true)

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: "",
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId: import.meta.env.VITE_GAuth_Client_ID,
                scope: "",
            })
        }
        gapi.load("client:auth2", start)
    }, [])

    const userLogin = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_LOCAL_API}/login`, { formData })
            const data = response.data
            if (data.success) {
                localStorage.setItem("auth-token", data.token)
                window.location.href ="/"
            } else {
                alert(data.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const userSignup = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_LOCAL_API}/signup`, { formData })
            const data = response.data
            if (data.success) {
                localStorage.setItem("auth-token", data.token)
                window.location.href ="/"
            } else {
                alert(data.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const userLogout = () => {
        localStorage.removeItem("auth-token")
        window.location.reload(false)
    }

    return (
        <div className="loginsignup">
            {localStorage.getItem("auth-token") ? (
                <div className={`loginsignup-logout ${localStorage.getItem("g-token") ? "disabled" : ""}`}  onClick={()=>userLogout()}>Logout</div>
            ) : (
                <div className={`loginsignup-container  ${localStorage.getItem("g-token") ? "disabled" : ""}`} >
                    <h1>{state}</h1>
                    <div className="loginsignup-fields">
                        {state === "Signup" && (
                            <input
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                type="text"
                                placeholder="Your Name"
                            />
                        )}
                        <input
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            type="email"
                            placeholder="Email Address"
                        />
                        <input
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            type="password"
                            placeholder="Password"
                        />
                    </div>
                    <button disabled={checked} onClick={() => (state === "Login" ? userLogin() : userSignup())}>
                        Continue
                    </button>
                    {state === "Signup" ? (
                        <p className="loginsignup-login" onClick={() => setState("Login")}>
                            Already have an account? <span>Login here</span>
                        </p>
                    ) : (
                        <p className="loginsignup-login" onClick={() => setState("Signup")}>
                            Create new account? <span>Click here</span>
                        </p>
                    )}
                    <div className="loginsignup-agree">
                        <input type="checkbox" onChange={() => setChecked((prev) => !prev)} />
                        <p>By continuing, i agree to the terms of use & privacy policy.</p>
                    </div>
                </div>
            )}
            <div className="loginsignup-google">
                <span>
                    <hr />
                    OR
                    <hr />
                </span>
                <div className="loginsignup-google-container">{localStorage.getItem("g-token") ? <Logout /> : <Login />}</div>
            </div>
        </div>
    )
}

export default LoginSignup
