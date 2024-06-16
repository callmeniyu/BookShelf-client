import React, { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./Navbar.css"
import { BookContext } from "../../context/BookContext"

const Navbar = () => {
    const [menuToggler, setMenuToggler] = useState(false)

    return (
        <div className="navbar">
            <div className="nav-logo">
                <h3>
                    book <span className="navlogo-span">shelf</span>
                </h3>
            </div>
            <ul className={`nav-items ${menuToggler && "nav-toggle-on"}`}>
                <li>
                    <Link className="nav-about">About</Link>
                </li>
                <li>
                    <Link className="nav-contact">Contact</Link>
                </li>
                <li>
                    <Link to="/login" className="nav-login">
                        Account
                    </Link>
                </li>
                <li>
                    <input type="text" className="search-book" placeholder="search book" />
                </li>
            </ul>
            <div></div>
            <svg
                onClick={() => setMenuToggler((prev) => !prev)}
                className={`nav-menu-icon `}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                style={{ fill: " rgba(255, 255, 255)", transform: "", msFilter: "" }}
            >
                <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"></path>
            </svg>
        </div>
    )
}

export default Navbar
