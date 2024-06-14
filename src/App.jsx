import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home/Home"
import Addbook from "./pages/Addbook/Addbook"
import Book from "./pages/Book/Book"
import "./App.css"
import LoginSignup from "./pages/LoginSignup/LoginSignup"

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/book" element={<Book />}>
                    <Route path=":bookId" element={<Book />} />
                </Route>
                <Route path="/login" element={<LoginSignup />} />
                <Route path="/addbook" element={<Addbook />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
