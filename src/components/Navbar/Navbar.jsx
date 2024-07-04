import React, { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./Navbar.css"
import { BookContext } from "../../context/BookContext"

const Navbar = (props) => {
    const [menuToggler, setMenuToggler] = useState(false)
    const [section, setSection] = useState(props.section)

    return (
        <div className={`navbar ${section === "home" ? "home-navbar":""} ${section === "about" ? "about-navbar":""} ${section === "contact" ? "contact-navbar":""} ${section === "account" ? "account-navbar":""} ${section === "book" ? "book-navbar":""}`}>
            <div className={`nav-logo ${section == "home" ? "home-logo" : ""} ${section == "account" ? "account-logo" : ""} `}>
                <h3>
                    book <span className="navlogo-span">shelf</span>
                </h3>
            </div>
            <ul className={`nav-items ${menuToggler && "nav-toggle-on"}`}>
                <li>
                    <Link to="/about" className={`nav-about ${props.section == "about" && "section-about"} ${props.section == "home" && "section-home"}`}>About</Link>
                </li>
                <li>
                    <Link to="/contact" className={`nav-contact ${props.section === "contact" && "section-contact"}`}>Contact</Link>
                </li>
                <li>
                    <Link to="/login" className={`nav-login ${props.section === "account" && "section-account"}`}>
                        Account
                    </Link>
                </li>
                <li>
                    <input type="text" className="search-book" placeholder="search book" />
                </li>
            </ul>
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
