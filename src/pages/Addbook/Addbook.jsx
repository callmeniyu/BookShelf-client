import React, { useContext, useEffect, useRef, useState } from "react"
import { Alert,  Slide,  Snackbar } from "@mui/material"
import "./Addbook.css"
import Footer from "../../components/Footer/Footer"
import upload_area from "../../assets/upload_area.svg"
import { BookContext } from "../../context/BookContext"
import { Link, useParams } from "react-router-dom"
import axios from "axios"
import * as Yup from "yup"

const AddBook = () => {
    const { bookId } = useParams()
    const imageRef = useRef()
    const { books, updateBook } = useContext(BookContext)
    const book = books.find((particularbook) => particularbook.id == bookId)
    const [image, setImage] = useState(false)
    const [alert, setAlert] = useState({
        open: false,
        message: "",
        severity:""
    })
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

    useEffect(() => {
        if (book) {
            setFormData({
                name: book.name || "",
                author: book.author || "",
                isbn: book.isbn || "",
                date: book.date || "",
                rating: book.rating || "",
                link: book.link || "",
                summary: book.summary || "",
                notes: book.notes || "",
            })
        }
    }, [book])

    const [errors, setErrors] = useState({})

    const validationSchema = Yup.object({
        name: Yup.string().required("Give name of the book"),
        author: Yup.string().required("Give author name").max(30, "Author name should be less than 30 chararcters"),
        isbn: Yup.number().typeError("isbn must be a number").required("isbn number is required"),
        date: Yup.string().required("Give a date "),
        link: Yup.string().required("Give online link"),
        summary: Yup.string()
            .max(600, "Summary should be less than 600 characters")
            .required("Provide atleast one sentence summary."),
        notes: Yup.string().required("Give your notes."),
    })

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    useEffect(() => {
        const sendImage = async () => {
            const newForm = new FormData()
            newForm.append("book", image)
            const response = await axios.post(`${import.meta.env.VITE_LOCAL_API}/upload`, newForm)
            const data = response.data
            if (data.success) {
                formData.img = data.img_url
            } else {
                console.log("Error uploading image")
            }
        }
        sendImage()
    }, [image])

    const submitBook = async (e) => {
        try {
            await validationSchema.validate(formData, { abortEarly: false })
            if (bookId) {
                updateBook(bookId, formData)
                setAlert({ open: true, message: "Book Updated", severity:"" })
            } else {
                addBook(formData)
                setAlert({ open: true, message: "Book Added", severity:""})
            }
        } catch (error) {
            const newErrors = {}
            error.inner.forEach((err) => {
                newErrors[err.path] = err.message
            })
            setErrors(newErrors)
            if (!image) {
                setErrors((prev) => ({ ...prev, img: "needed" }))
            }
        }
    }

    const handleImage = (e) => {
        setImage(e.target.files[0])
    }

    useEffect(() => {
        if (image) {
            const imgURL = URL.createObjectURL(image)
            imageRef.current.src = imgURL
        }
    }, [image])
    return (
        <div className="AddBook">
            <Slide direction="up" in={alert.open} mountOnEnter unmountOnExit>
            <Snackbar className="snackbar" open={alert.open} autoHideDuration={1000}  >
                <Alert
                    severity="success"
                    variant="filled"
                    onClose={() => {
                        window.location.href = "/"
                        setAlert({ open: false, message: "" })
                    }}
                    className="alert"
                    sx={{ width: "20rem" }}
                >
                    {alert.message}
                </Alert>
            </Snackbar>
            </Slide>
            <div className="AddBook-container">
                <h3>{book ? "edit book" : "new book"}</h3>
                <form className="AddBook-form" onSubmit={(e) => e.preventDefault()}>
                    <div className="AddBook-name">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            value={formData.name}
                            className="AddBook-name-field"
                            onChange={handleChange}
                            name="name"
                            id="name"
                            placeholder="Enter name of your book"
                        />
                        {errors.name && <div className="error">{errors.name}</div>}
                    </div>
                    <div className="AddBook-author">
                        <label htmlFor="author">Author</label>
                        <input
                            type="text"
                            value={formData.author}
                            className="AddBook-author-field"
                            onChange={handleChange}
                            name="author"
                            id="author"
                            placeholder="Enter name of the auther"
                        />
                        {errors.author && <div className="error">{errors.author}</div>}
                    </div>
                    <div className="AddBook-isbn">
                        <label htmlFor="rating">ISBN</label>
                        <input
                            type="text"
                            className="AddBook-isbn-field"
                            onChange={handleChange}
                            value={formData.isbn}
                            name="isbn"
                            id="isbn"
                            placeholder="Enter isbn of your book"
                        />
                        {errors.isbn && <div className="error">{errors.isbn}</div>}
                    </div>
                    <div className="AddBook-date">
                        <label htmlFor="date">Date</label>
                        <input
                            type="date"
                            value={formData.date}
                            className="AddBook-date-field"
                            onChange={handleChange}
                            name="date"
                            id="date"
                        />
                        {errors.date && <div className="error">{errors.date}</div>}
                    </div>
                    <div className="AddBook-rating">
                        <label htmlFor="rating">Rating</label>
                        <select
                            className="AddBook-rating-field"
                            name="rating"
                            onChange={handleChange}
                            value={formData.rating}
                        >
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
                            value={formData.link}
                            onChange={handleChange}
                            name="link"
                            id="link"
                            placeholder="Provide link to the online store"
                        />
                        {errors.link && <div className="error">{errors.link}</div>}
                    </div>
                    <div className="AddBook-summary">
                        <label htmlFor="summary">Summary</label>
                        <textarea
                            className="AddBook-summary-field"
                            value={formData.summary}
                            onChange={handleChange}
                            name="summary"
                            id="summary"
                            placeholder="Give the summary of the book."
                        ></textarea>
                        {errors.summary && <div className="error">{errors.summary}</div>}
                    </div>
                    <div className="AddBook-notes">
                        <label htmlFor="notes">Notes</label>
                        <textarea
                            className="AddBook-notes-field"
                            value={formData.notes}
                            onChange={handleChange}
                            name="notes"
                            id="notes"
                            placeholder="Describe your learnings from the book"
                        ></textarea>
                        {errors.notes && <div className="error">{errors.notes}</div>}
                    </div>
                    <div className="AddBook-img-field">
                        <label htmlFor="file-input">
                            {book ? (
                                <img ref={imageRef} src={book.img} className="AddBook-img" />
                            ) : (
                                <img
                                    ref={imageRef}
                                    src={image ? URL.createObjectURL(image) : upload_area}
                                    className="AddBook-img"
                                    alt=""
                                />
                            )}
                        </label>
                        <input type="file" onChange={handleImage} name="image" id="file-input" hidden />
                        {errors.img && <div className="error">{errors.img}</div>}
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
