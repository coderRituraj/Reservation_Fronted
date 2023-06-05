import React from 'react'
import Contact from './Contact'
import Footer from './Footer'
import Notification from './Notification'
import Portfolio from './Portfolio'
import Services from './Services'
import About from './About'
import Navbars from './Navbars'
import  SearchTrains  from './SearchTrains'

const Home = () => {
  return (
    <div>
        <Navbars/>
        <Notification/>
        <About />
        <Services/>
        
        <Portfolio/>
        <Contact/>
        <Footer/>
        
    </div>

  )
}

export default Home