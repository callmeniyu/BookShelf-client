import React from "react"
import GoogleIcon from '@mui/icons-material/Google';

const Logout = () => {
    const handleLogout = () => {
        localStorage.removeItem("g-token")
        window.location.href = "/"
    }
    return (
        <>
            <button className="loginsignup-google-ggl" onClick={() => handleLogout()}>
                <GoogleIcon /> Sign out  Google
            </button>
        </>
    )
}

export default Logout
