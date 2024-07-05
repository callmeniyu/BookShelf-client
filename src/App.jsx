import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home/Home"
import Addbook from "./pages/Addbook/Addbook"
import About from "./components/About/About"
import Contact from "./components/Contact/Contact"
import Book from "./pages/Book/Book"
import "./App.css"
import LoginSignup from "./pages/LoginSignup/LoginSignup"

function App() {
    return (
        <BrowserRouter basename="/tothepoint_login">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/book" element={<Book />}>
                    <Route path=":bookId" element={<Book />} />
                </Route>
                <Route path="/edit" element={<Addbook />}>
                    <Route path=":bookId" element={Addbook} />
                </Route>
                <Route path="/login" element={<LoginSignup />} />
                <Route path="/addbook" element={<Addbook />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
