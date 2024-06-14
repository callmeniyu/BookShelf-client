import React, { useContext, useState } from "react"
import "./Addbook.css"
import Footer from "../../components/Footer/Footer"
import upload_area from "../../assets/upload_area.svg"
import { BookContext } from "../../context/BookContext"
import { Link } from "react-router-dom"
import axios from "axios"
const AddBook = () => {
    const [image, setImage] = useState(false)
    const { addBook } = useContext(BookContext)


    const [formData, setFormData] = useState({
        name: "",
        author: "",
        isbn: "",
        date: "",
        rating: "",
        link: "",
        summary: "",
        notes: "",
        img: "",
    })

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const submitBook = async(e) => {
        const newForm = new FormData()
        newForm.append("book", image)
        const response = await axios.post(`${import.meta.env.VITE_LOCAL_API}/upload`, newForm)
        const data = response.data
        console.log(data.img_url)
        if (data.success) {
            formData.img = data.img_url
        } else {
            console.log("Error uploading image")
        }
        addBook(formData)
        alert("Book added")
        window.location.href = "/"

    }

    const handleImage = (e) => {
        setImage(e.target.files[0])
    }
    return (
        <div className="AddBook">
            <div className="AddBook-container">
                <h3>new book</h3>
                <form className="AddBook-form" onSubmit={(e)=>e.preventDefault()}>
                    <div className="AddBook-name">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            className="AddBook-name-field"
                            onChange={handleChange}
                            name="name"
                            id="name"
                            placeholder="Enter name of your book"
                        />
                    </div>
                    <div className="AddBook-author">
                        <label htmlFor="author">Author</label>
                        <input
                            type="text"
                            className="AddBook-author-field"
                            onChange={handleChange}
                            name="author"
                            id="author"
                            placeholder="Enter name of the auther"
                        />
                    </div>
                    <div className="AddBook-isbn">
                        <label htmlFor="rating">ISBN</label>
                        <input
                            type="text"
                            className="AddBook-isbn-field"
                            onChange={handleChange}
                            name="isbn"
                            id="isbn"
                            placeholder="Enter isbn of your book"
                        />
                    </div>
                    <div className="AddBook-date">
                        <label htmlFor="date">Date</label>
                        <input
                            type="date"
                            className="AddBook-date-field"
                            onChange={handleChange}
                            name="date"
                            id="date"
                        />
                    </div>
                    <div className="AddBook-rating">
                        <label htmlFor="rating">Rating</label>
                        <select className="AddBook-rating-field" name="rating" onChange={handleChange}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
                    </div>
                    <div className="AddBook-link">
                        <label htmlFor="link">link</label>
                        <input
                            type="text"
                            className="AddBook-link-field"
                            onChange={handleChange}
                            name="link"
                            id="link"
                            placeholder="Provide link to the online store"
                        />
                    </div>
                    <div className="AddBook-summary">
                        <label htmlFor="summary">Summary</label>
                        <textarea
                            className="AddBook-summary-field"
                            onChange={handleChange}
                            name="summary"
                            id="summary"
                            placeholder="Give the summary of the book."
                        ></textarea>
                    </div>
                    <div className="AddBook-notes">
                        <label htmlFor="notes">Notes</label>
                        <textarea
                            className="AddBook-notes-field"
                            onChange={handleChange}
                            name="notes"
                            id="notes"
                            placeholder="Describe your learnings from the book"
                        ></textarea>
                    </div>
                    <div className="AddBook-img-field">
                        <label htmlFor="file-input">
                            <img
                                src={image ? URL.createObjectURL(image) : upload_area}
                                className="AddBook-img"
                                alt=""
                            />
                        </label>
                        <input type="file" onChange={handleImage} name="image" id="file-input" hidden />
                    </div>
                    <Link className="AddBook-submit-btn" onClick={() => submitBook()}>
                        Submit
                    </Link>
                </form>
            </div>
            <Footer />
        </div>
    )
}

export default AddBook
