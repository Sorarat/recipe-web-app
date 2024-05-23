import React from 'react'
import Navbar from './Navbar'
import Hero from './Hero'
import Search from './Search'
import Categories from './Categories'

const Home = () => {
  return (
    <div>
        <Navbar/>
        <Hero/>
        <Search/>
        <Categories/>
    </div>
  )
}

export default Home