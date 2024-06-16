import React, { useContext } from "react"
import { Link } from "react-router-dom"
import BookStack_img from "../../assets/images/bookStack_img.png"
import { BookContext } from "../../context/BookContext"
import "./Books.css"

const Books = (props) => {
    const { books } = useContext(BookContext)
    return (
        <div className="books">
            {books.length > 0 ? (
                books.map((book) => (
                    <div className="books-wrap" key={book.id}>
                        <div className="books-left">{book.summary || "Provide summary"}</div>
                        <div className="books-right">
                            <div>
                                <div className="books-details">
                                    <h1>{book.name || "Book Name"}</h1>
                                    <h2>{book.author || "Auther Name"}</h2>
                                    <p>{book.date || "Date"}</p>
                                    <p>isbn: {book.isbn}</p>
                                    <p>Rating: {book.rating || 0}/10</p>
                                </div>

                                <div className="books-details-btns">
                                    <Link to={`/book/${book.id}`} className="readmore-btn">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            style={{ fill: "rgba(0, 0, 0, 1)", transform: "", msFilter: "" }}
                                        >
                                            <path d="m13 3 3.293 3.293-7 7 1.414 1.414 7-7L21 11V3z"></path>
                                            <path d="M19 19H5V5h7l-2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-5l-2-2v7z"></path>
                                        </svg>{" "}
                                        Read more
                                    </Link>
                                    <Link to={book.link} className="buy-online-btn">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            style={{ fill: "rgba(255, 255, 255, 1)", transform: "", msFilter: "" }}
                                        >
                                            <path d="M21.822 7.431A1 1 0 0 0 21 7H7.333L6.179 4.23A1.994 1.994 0 0 0 4.333 3H2v2h2.333l4.744 11.385A1 1 0 0 0 10 17h8c.417 0 .79-.259.937-.648l3-8a1 1 0 0 0-.115-.921zM17.307 15h-6.64l-2.5-6h11.39l-2.25 6z"></path>
                                            <circle cx="10.5" cy="19.5" r="1.5"></circle>
                                            <circle cx="17.5" cy="19.5" r="1.5"></circle>
                                        </svg>{" "}
                                        Buy Online
                                    </Link>
                                </div>
                            </div>
                            <img src={book.img} className="book-cover-img" alt="book-cvr-img" />
                        </div>
                    </div>
                ))
            ) : (
                <div className="books-alternative">
                    <div className="books-alternative-left"><img src={BookStack_img} alt="" /></div>
                        <div className="books-alternative-right">
                            <h1>Add some books to show here</h1>
                        </div>
                </div>
            )}
        </div>
    )
}

export default Books
