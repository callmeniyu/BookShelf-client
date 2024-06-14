import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import BookContextProvider from "./context/BookContext"

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BookContextProvider>
            <App />
        </BookContextProvider>
    </React.StrictMode>
)
