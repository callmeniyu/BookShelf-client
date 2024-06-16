import React, { createContext, useEffect, useState } from "react"
import axios from "axios"

export const BookContext = createContext(null)

let id = 0

const BookContextProvider = (props) => {
    let [books, setBooks] = useState([])
    const [user, setUser] = useState("")
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



    const contextValue = { books, addBook, removeBook, setUser }
    return <BookContext.Provider value={contextValue}>{props.children}</BookContext.Provider>
}

export default BookContextProvider
