import React, { createContext, useEffect, useState } from "react"
import axios from "axios"

export const BookContext = createContext(null)

let id = 0

const BookContextProvider = (props) => {
    let [books, setBooks] = useState([])
    const [user, setUser] = useState("")
    const [searchedBook, setSearchedBook] = useState()
    useEffect(() => {
        const allBooks = async () => {
            const response = await axios.post(`${import.meta.env.VITE_LOCAL_API}/allbooks`, { email: user }, {
                headers: {
                    "auth-token":localStorage.getItem("auth-token") || localStorage.getItem("g-token")
                }
            })
            const booksData = response.data.books
            setBooks(booksData)
        }
        allBooks()
    }, [])

    const addBook = async (book) => {
        // LOGIC FOR FORMING ID
        if (books.length > 0) {
            const lastBookArr = books.slice(-1)
            const lastBookId = lastBookArr[0].id
            book.id = lastBookId + 1
        } else {
            book.id = 1
        }
        const response = await axios.patch(`${import.meta.env.VITE_LOCAL_API}/addbook`, { email: user, ...book }, {
            headers: {
                "auth-token": localStorage.getItem("auth-token") || localStorage.getItem("g-token")
            }
        })
    }

    const removeBook = async (bookId) => {
        const response = await axios.post(`${import.meta.env.VITE_LOCAL_API}/removebook`, { bookId }, {
            headers: {
                "auth-token": localStorage.getItem("auth-token") || localStorage.getItem("g-token")
            }
        })
    }

    const updateBook = async (bookId, formData) => {
        console.log(bookId, formData)
        const response = await axios.post(`${import.meta.env.VITE_LOCAL_API}/updatebook`, { bookId:bookId, formData:formData}, {
            headers: {
                "auth-token": localStorage.getItem("auth-token") || localStorage.getItem("g-token")
            }
        });
    };

    const findBook = (bookName) => {
        const response = books.filter((book) => book.name.toLowerCase() == bookName.toLowerCase() || book.author.toLowerCase() == bookName.toLowerCase() || book.isbn.toLowerCase() == bookName.toLowerCase() || book.rating.toLowerCase() == bookName.toLowerCase() || book.date.toLowerCase() == bookName.toLowerCase())
        setSearchedBook(response)
        if (!response.length == 0) {
            window.scrollTo(680,680) 
        } 
        
    }


    const contextValue = { books, addBook, removeBook, setUser, updateBook, findBook,  searchedBook}
    return <BookContext.Provider value={contextValue}>{props.children}</BookContext.Provider>
}

export default BookContextProvider
