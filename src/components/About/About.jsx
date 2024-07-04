import React from "react"
import Navbar from "../Navbar/Navbar"
import Footer from "../Footer/Footer"
import { Container } from "@mui/material"
import "./About.css"
import { Link } from "react-router-dom"

const About = () => {
    return (
        <>
            <Navbar section="about"/>
            <div className="about">
                <h1>#About</h1>
                <p>
                    This is a MERN-based web application designed and developed by Mohammed Niyas. Inspired by the need to
                    have a dedicated space to store records and insights from reading books, ultimately created this
                    application. I hope it proves useful to you as well. Feedback and reviews are much appreciated. Enjoy
                    the App!
                </p>
                <Link to="/" type="submit" className="backto-home-btn">
                    Back to Home
                </Link>
            </div>
            <Footer />
        </>
    )
}

export default About
