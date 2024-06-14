import React from 'react'
import "./Home.css"
import Navbar from '../../components/Navbar/Navbar'
import Hero from '../../components/Hero/Hero'
import Books from '../../components/Books/Books'
import Footer from '../../components/Footer/Footer'

const Home = () => {
  window.scrollTo(0,0)
  return (
    <div className='home'>
      <Navbar />
      <Hero />
      <Books />
      <Footer />
    </div>
  )
}

export default Home