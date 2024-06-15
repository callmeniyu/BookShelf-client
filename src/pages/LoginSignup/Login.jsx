import React, { useContext, useEffect, useState } from 'react'
import { GoogleLogin } from 'react-google-login';
import { BookContext } from '../../context/BookContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Login = () => {
    const { getAuthToken, setUser } = useContext(BookContext)
    const navigate = useNavigate()

    const [userToken, setUserToken] = useState("")

    useEffect(() => {
        if (userToken) {
            console.log("userToken", userToken)
            getAuthToken(userToken)
            navigate("/")
        }
    },[userToken],[navigate])

    const onSuccess = (res) => {

        console.log("Login succes", res.profileObj)

        const getToken = async() => {
            try {
                const auth2 = await gapi.auth2.getAuthInstance()
                const GAuthToken = await auth2.currentUser.get().getAuthResponse().id_token
                setUserToken(GAuthToken)
                setUser(res.profileObj.email)
                const response = await axios.post(`${import.meta.env.VITE_LOCAL_API}/googlelogin`,{email:res.profileObj.email})
            } catch (error) {
                console.log(error)
            }
        }
        getToken()
    }

    const onFailure = (res) => {
        console.log("Login failed", res)
    }
  return (
      <div id="signInButton">
          <GoogleLogin 
              clientId={import.meta.env.VITE_GAuth_Client_ID}
              buttonText='Login using Google'
              onSuccess={onSuccess}
              onFailure={onFailure}
              cookiePolicy={'single_host_origin'}
              isSignedIn={true}
              className="loginsignup-google-ggl"
          />
    </div>
  )
}

export default Login