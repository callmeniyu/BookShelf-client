import React, { useContext, useEffect, useState } from "react"
import "./LoginSignup.css"
import Login from "./Login"
import Logout from "./Logout"
import { gapi } from "gapi-script"
import { BookContext } from "../../context/BookContext"
const LoginSignup = () => {

    const {authToken} = useContext(BookContext)

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



    return (
        <div className="loginsignup">
            <div className="loginsignup-container">
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
                <button disabled={checked}>Continue</button>
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
            <div className="loginsignup-google">
                <span>
                    <hr />
                    OR
                    <hr />
                </span>
                <div className="loginsignup-google-container">
                    {authToken ? <Logout /> : <Login />}
                </div>
            </div>
        </div>
    )
}

export default LoginSignup
