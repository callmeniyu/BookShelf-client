import React from 'react'
import { GoogleLogout } from 'react-google-login'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
    const navigate = useNavigate()
    const onSuccess = () => {
        console.log("Logout Succesfull")
        window.location.href = "/"
    }
  return (
      <div id="signOutButton">
          <GoogleLogout 
              clientId={import.meta.env.VITE_GAuth_Client_ID}
              buttonText='Logout'
              onLogoutSuccess={onSuccess}
              className="loginsignup-google-ggl"
          />
    </div>
  )
}

export default Logout