import React from 'react'
import { Route, Routes } from 'react-router-dom'

// Layout
// import Navbar from './components/layout/Navbar'
// import Footer from './components/layout/Footer'

// Pages
import Home from '../pages/Home'
import Airrectionisthomepage from '../pages/Aireceptionisthomepage'
import About from '../pages/About'
import Contact from '../pages/Contact'
import Blog from '../pages/Blog'
import Services from '../pages/Services'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Dashboard from '../pages/Dashboard'
import NotFound from '../pages/NotFound'
import Chat from '../pages/Chat'
import CustomAiTrial from '../pages/CustomAiTrial'
import HowItWorks from '../pages/HowItWorks'

export default function AppRoutes() {
    return (
        <>
            {/* <Navbar /> */}
            <Routes>
                {/* <Route path="/" element={<Home />} /> */}
                {/* <Route path="/ai-receptionist" element={<Airrectionisthomepage />} /> */}
                <Route path="/" element={<Airrectionisthomepage />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/services" element={<Services />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/custom-ai-trial" element={<CustomAiTrial />} />
                <Route path="/how-it-works" element={<HowItWorks />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            {/* <Footer /> */}
        </>
    )
}
