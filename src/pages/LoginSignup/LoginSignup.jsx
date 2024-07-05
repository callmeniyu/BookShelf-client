import React, { useEffect, useState } from "react"
import "./LoginSignup.css"
import Login from "./Login"
import Logout from "./Logout"
import Footer from "../../components/Footer/Footer"
import axios from "axios"
import { Alert, Slide, Snackbar } from "@mui/material"
import Navbar from "../../components/Navbar/Navbar"
const LoginSignup = () => {
    const [state, setState] = useState("Login")
    const [checked, setChecked] = useState(true)
    const [errors, setErrors] = useState({})
    const [alert, setAlert] = useState({
        open: false,
        message: "",
        severity: "",
    })

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: "",
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }



    const userLogin = async () => {
        try {
            console.log("User data submitted ", formData)
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_API}login`, { formData })
            const data = response.data
            if (data.success) {
                localStorage.setItem("auth-token", data.token)
                window.location.href = "/"
            } else {
                setAlert({ open: true, message: data.message, severity: "error" })
            }
        } catch (error) {
            console.log(error)
        }
    }

    const userSignup = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_API}signup`, { formData })
            const data = response.data
            if (data.success) {
                localStorage.setItem("auth-token", data.token)
                window.location.href = "/"
            } else {
                setAlert({ open: true, message: data.message, severity: "error" })
            }
        } catch (error) {
            console.log("validation erros", error)
        }
    }

    const userLogout = () => {
        localStorage.removeItem("auth-token")
        window.location.reload(false)
    }

    return (
        <>
            <Navbar section="account"/>
            <div className="loginsignup">
                <Slide direction="up" in={alert.open} mountOnEnter unmountOnExit>
                    <Snackbar className="snackbar" open={alert.open} autoHideDuration={1000}>
                        <Alert
                            severity={alert.severity}
                            variant="filled"
                            onClose={() => {
                                setAlert({ open: false })
                            }}
                            className="alert"
                            sx={{ width: "22rem" }}
                        >
                            {alert.message}
                        </Alert>
                    </Snackbar>
                </Slide>
                {localStorage.getItem("auth-token") ? (
                    <div
                        onClick={() => userLogout()}
                    >
                        Logout
                    </div>
                ) : (
                    <div className={`loginsignup-container  ${localStorage.getItem("g-token") ? "disabled" : ""}`}>
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
                            {errors.username && <div className="error">{errors.username}</div>}
                            <input
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                type="email"
                                placeholder="Email Address"
                            />
                            {errors.username && <div className="error">{errors.username}</div>}

                            <input
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                type="password"
                                placeholder="Password"
                            />
                            {errors.username && <div className="error">{errors.username}</div>}
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
                    <div className="loginsignup-google-container">
                        {localStorage.getItem("g-token") ? <Logout /> : <Login />}
                    </div>
                </div>
            </div>
            <Footer />

        </>
    )
}

export default LoginSignup
