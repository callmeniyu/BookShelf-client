import React, { useContext, useState } from "react"
import { Link, useParams } from "react-router-dom"
import "./Book.css"
import Footer from "../../components/Footer/Footer"
import { BookContext } from "../../context/BookContext"
const Book = () => {
    const { bookId } = useParams()
    const { books, removeBook } = useContext(BookContext)
    const book = books.find((particularbook) => particularbook.id == bookId)

    const handleRemove = (bookId) => {
        removeBook(bookId)
        alert(`${book.name} removed`)
        window.location.href="/"
    }

    return (
        <div className="book">
            <div className="book-wrap">
                <div>
                    <div className="book-left">{book.summary}</div>
                    <div className="book-right">
                        <div>
                            <div className="book-details">
                                <h1>{book.name}</h1>
                                <h2>{book.author}</h2>
                                <p>{book.date}</p>
                                <p>{book.isbn}</p>
                                <p>Rating: {book.rating}/10</p>
                            </div>

                            <div className="book-details-btns">
                                <Link to={`/edit/${bookId}`} className="book-edit-btn">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        style={{ fill: "rgba(0, 0, 0, 1)", transform: "", msFilter: "" }}
                                    >
                                        <path d="m7 17.013 4.413-.015 9.632-9.54c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.756-.756-2.075-.752-2.825-.003L7 12.583v4.43zM18.045 4.458l1.589 1.583-1.597 1.582-1.586-1.585 1.594-1.58zM9 13.417l6.03-5.973 1.586 1.586-6.029 5.971L9 15.006v-1.589z"></path>
                                        <path d="M5 21h14c1.103 0 2-.897 2-2v-8.668l-2 2V19H8.158c-.026 0-.053.01-.079.01-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2z"></path>
                                    </svg>
                                    Edit Book
                                </Link>
                                <Link className="buy-online-btn" onClick={() => handleRemove(book.id)}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        style={{ fill: "rgba(255, 255, 255, 1)", transform: "", msFilter: "" }}
                                    >
                                        <path d="M6 7H5v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7H6zm10.618-3L15 2H9L7.382 4H3v2h18V4z"></path>
                                    </svg>
                                    Remove Book
                                </Link>
                            </div>
                        </div>
                        <img src={book.img} className="book-cover-img" alt="book-cvr-img" />
                    </div>
                </div>
                <hr />
                <div className="book-notes">
                    <h3>my notes </h3>
                    <div className="book-notes-list">{book.notes}</div>
                    <hr />
                    <Link to="/" type="submit" className="backto-home-btn">
                        Back to Home
                    </Link>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Book
