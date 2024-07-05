import React from "react"
import ReactDOM from "react-dom/client"
import { GoogleOAuthProvider } from "@react-oauth/google"
import App from "./App.jsx"
import BookContextProvider from "./context/BookContext"

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <GoogleOAuthProvider clientId = {import.meta.env.VITE_GAuth_Client_ID}>
            <BookContextProvider>
                <App />
            </BookContextProvider>
        </GoogleOAuthProvider>
    </React.StrictMode>
)
