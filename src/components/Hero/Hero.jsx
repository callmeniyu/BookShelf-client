import React, { useContext } from "react"
import { Link } from "react-router-dom"
import Bookshelf_img from "../../assets/images/Bookshelf_img.png"
import { BookContext } from "../../context/BookContext.jsx"
import "./Hero.css"

const Hero = () => {
    return (
        <div className="hero">
            <div className="hero-left">
                <h1>
                    A place to keep <br />
                    the records of <br />
                    <span>book </span><br />
                    you read.
                </h1>
                <Link className="hero-newbook" to="/addbook"><span>+</span> new book</Link>
            </div>
            <div className="hero-right">
                <img src={Bookshelf_img} className="hero-bookshelf-img" alt="bookshelf img" />
            </div>
        </div>
    )
}

export default Hero
