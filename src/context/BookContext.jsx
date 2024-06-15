import React, { createContext, useEffect, useState } from "react"
import axios from "axios"

export const BookContext = createContext(null)

let id = 0

const BookContextProvider = (props) => {
    const [authToken, setAuthToken] = useState("")
    let [books, setBooks] = useState([])
    const [user, setUser] = useState("")

    useEffect(() => {
        const allBooks = async () => {
            const response = await axios.get(`${import.meta.env.VITE_LOCAL_API}/allbooks`)
            const data = response.data
            setBooks(data)
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
        const response = await axios.patch(`${import.meta.env.VITE_LOCAL_API}/addbook`, { email:user, ...book })
    }

    const removeBook = async (bookId) => {
        const response = await axios.post(`${import.meta.env.VITE_LOCAL_API}/removebook`, { bookId })
    }

    const getAuthToken = (userToken) => {
        setAuthToken(userToken)
    }

    const contextValue = { books, addBook, removeBook, getAuthToken, authToken, setUser }
    return <BookContext.Provider value={contextValue}>{props.children}</BookContext.Provider>
}

export default BookContextProvider
