import React from 'react'
import { GoogleLogout } from 'react-google-login'

const Logout = () => {
    const onSuccess = () => {
        localStorage.removeItem("g-token")
        console.log("Logout Succesfull")
        window.location.reload(false)
    }
  return (
      <div id="signOutButton" >
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